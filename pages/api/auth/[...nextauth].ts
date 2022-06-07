import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosClient from "../../../api/apiClient";
import { login } from "../../../api/AuthAPI";
import * as cookie from "cookie";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import axios, { AxiosError } from "axios";
import { BASE_API, Endoints } from "../../../common/constants";

async function refreshAccessToken(token) {
  axiosClient.defaults.headers["cookie"] = cookie.serialize(
    "Refresh",
    token.refreshToken
  );
  return await axiosClient.get("/auth/refresh").then((response) => {
    if (axiosClient.defaults.headers.common["set-cookie"]) {
      delete axiosClient.defaults.headers.common["set-cookie"];
    }

    return {
      ...token,
      accessToken: response.data.accessToken,
      accessTokenExpires: Date.now() + 1000,
      refreshToken: response.data.refreshToken,
    };
  });
}

const nextAuthOptions = (req, res) => {
  return {
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
        async authorize(credentials, req) {
          const payload = {
            email: credentials.email,
            password: credentials.password,
          };

          const user = await login(payload)
            .then((response) => {
              const cookies = response.headers["set-cookie"];
              res.setHeader("Set-Cookie", cookies);
              return response.data;
            })
            .catch(() => {
              throw new Error(user.exception);
            });
          if (user) {
            return user;
          }

          return null;
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
      async jwt({ token, user, account }) {
        if (user && account?.provider === "credentials") {
          return await refreshAccessToken({
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            accessTokenExpires: user.accessTokenExpires,
            user,
          });
        }

        return token;
      },

      async signIn({ account, profile }) {
        if (account.provider === "google") {
          try {
            const status = await axios
              .post(`${BASE_API + Endoints.Auth}/google`, {
                username: profile.given_name,
                email: profile.email,
              })
              .then((response) => {
                const cookies = response.headers["set-cookie"];
                res.setHeader("Set-Cookie", cookies);
                return response.status;
              })
              .catch((error: AxiosError) => error.response.status);
            return profile.email_verified && status === 201;
          } catch {
            return false;
          }
        }

        if (account.provider === "spotify") {
          try {
            const status = await axios
              .post(`${BASE_API + Endoints.Auth}/spotify`, {
                username: profile.display_name,
                email: profile.email,
              })
              .then((response) => {
                const cookies = response.headers["set-cookie"];
                res.setHeader("Set-Cookie", cookies);
                return response.status;
              })
              .catch((error: AxiosError) => error.response.status);
            return status === 201;
          } catch {
            return false;
          }
        }

        return true;
      },

      async redirect({ url }) {
        const baseUrl = process.env.REACT_APP_API_URL;
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        return baseUrl;
      },

      async session({ session, token }) {
        const meInfo = await axios
          .get(`${BASE_API + Endoints.Auth}/me`, { headers: req.headers })
          .then((response) => response.data)
          .catch(() => ({}));
        session = {
          user: meInfo,
          ...session.user,
          ...token,
        };
        if (session.user?.id) session.userId = session.user.id;
        session.accessToken = token.accessToken;
        return session;
      },
    },
    debug: process.env.NODE_ENV === "development",
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
