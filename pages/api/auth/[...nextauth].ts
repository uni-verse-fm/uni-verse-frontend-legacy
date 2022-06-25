import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "../../../api/AuthAPI";
import NextAuth from "next-auth";
import * as cookie from "cookie";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";
import { BASE_API, headers } from "../../../common/constants";
import { Endoints } from "../../../common/types";
import { axiosAuthClient } from "../../../common/contexts/AxiosContext";
import { adminLogin } from "../../../api/AdminAPI";
import { AES } from "crypto-js";

async function refreshAccessToken(token) {
  axiosAuthClient.defaults.headers["cookie"] = cookie.serialize(
    "Refresh",
    token.refreshToken
  );

  return await axiosAuthClient.get("/auth/refresh").then((response) => {
    return {
      ...token,
      accessToken: response.data.accessToken,
      accessTokenExpires: Date.now() + 1000,
      refreshToken: token.refreshToken,
    };
  });
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "api-auth",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        return await login(payload)
          .then((response) => response.data)
          .catch((error) => {
            throw new Error(error);
          });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_AUTH_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_AUTH_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/Login",
  },
  callbacks: {
    async redirect({ url }) {
      const baseUrl = process.env.NEXTAUTH_URL;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },

    async jwt({ token, user, account }) {
      if (user && account?.provider === "credentials") {
        return await refreshAccessToken({
          ...token,
          ...user,
        });
      }

      if (token.refreshToken) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async signIn({ account, profile }) {
      let encryptedAccessToken: any = "";
      if (account.provider !== "credentials") {
        const adminAccessToken = await adminLogin().then(
          (response) => response.adminAccessToken
        );
        encryptedAccessToken = AES.encrypt(
          adminAccessToken as string,
          process.env.UNIVERSE_PRIVATE_KEY
        );
      }
      if (account.provider === "google") {
        return await axios
          .post(
            `${BASE_API + Endoints.Auth}/google`,
            {
              username: profile.given_name,
              email: profile.email,
            },
            {
              headers: {
                ...headers,
                Authorization: `${encryptedAccessToken}`,
              },
            }
          )
          .then((response) => {
            return profile.email_verified && response.status === 201;
          })
          .catch(() => false);
      }

      if (account.provider === "spotify") {
        return await axios
          .post(
            `${BASE_API + Endoints.Auth}/spotify`,
            {
              username: profile.display_name,
              email: profile.email,
            },
            {
              headers: {
                ...headers,
                Authorization: `${encryptedAccessToken}`,
              },
            }
          )
          .then((response) => {
            return response.status === 201;
          })
          .catch(() => false);
      }

      return true;
    },

    async session({ session, token }) {
      const customSession = {
        ...session,
        refreshToken: token.refreshToken,
        user: {
          ...session.user,
          username: token.username,
          email: token.email,
          id: token.id,
          accountId: token.accountId,
          profilePicture: token.profilePicture,
        },
      };
      return customSession;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
