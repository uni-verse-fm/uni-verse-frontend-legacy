import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "../../../api/AuthAPI";
import NextAuth from "next-auth";
import * as cookie from "cookie";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import axios, { AxiosError } from "axios";
import { BASE_API } from "../../../common/constants";
import { Endoints } from "../../../common/types";
import { axiosAuthClient } from "../../../common/contexts/AxiosContext";

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
      if (account.provider === "google") {
        return await axios
          .post(`${BASE_API + Endoints.Auth}/google`, {
            username: profile.given_name,
            email: profile.email,
          })
          .then((response) => {
            return profile.email_verified && response.status === 201;
          })
          .catch(() => false);
      }

      if (account.provider === "spotify") {
        return await axios
          .post(`${BASE_API + Endoints.Auth}/spotify`, {
            username: profile.display_name,
            email: profile.email,
          })
          .then((response) => {
            return response.status === 201;
          })
          .catch(() => false);
      }

      return true;
    },

    async session({ session, token }) {
      const meInfo = await axios
        .get(`${BASE_API + Endoints.Auth}/me`, {
          headers: {
            Authorization: `${token.accessToken}`,
          },
        })
        .then((response) => response.data)
        .catch((error: AxiosError) => error.response.status);

      return {
        ...session,
        ...token,
        user: meInfo,
        userId: (session.user as any).id,
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
});
