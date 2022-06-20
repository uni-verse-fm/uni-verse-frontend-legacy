import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosAuthClient } from "../../../api/apiClient";
import { login } from "../../../api/AuthAPI";
import * as cookie from "cookie";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import axios, { AxiosError } from "axios";
import { BASE_API } from "../../../common/constants";
import { Endoints } from "../../../common/types";
import { NextApiRequest, NextApiResponse } from "next";

async function refreshAccessToken(token) {

  axiosAuthClient.defaults.headers["cookie"] = cookie.serialize(
    "Refresh",
    token.refreshToken
  );

  console.debug("set cookie " + JSON.stringify(axiosAuthClient.defaults.headers))
  console.debug("cookie " + axiosAuthClient.defaults.headers["cookie"])


  return await axiosAuthClient.get("/auth/refresh").then((response) => {
    response.headers["cookie"] = axiosAuthClient.defaults.headers['cookie'];
    return {
      ...token,
      accessToken: response.data.accessToken,
      accessTokenExpires: Date.now() + 1000,
      refreshToken: token.refreshToken,
    };
  });
}

const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
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
              res.setHeader(
                "cookie",
                [cookie.serialize("Authentication", response.data.accessToken),
                cookie.serialize("Refresh", response.data.refreshToken)]
              );

              return response.data;
            })
            .catch((error) => {
              throw new Error(error);
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
      async redirect({ url }) {
        const baseUrl = process.env.NEXTAUTH_URL;
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        return baseUrl;
      },

      async jwt({ token, user, account }) {
        console.debug("jwt");

        console.debug("jwt token " + JSON.stringify(token));
        console.debug("jwt user " + JSON.stringify(user));
        console.debug("jwt to user " + JSON.stringify(token.user));
        console.debug("jwt account " + JSON.stringify(account));

        if (user && account?.provider === "credentials") {
          const response = await refreshAccessToken({
            ...token,
            ...user,
          });
          return response;
        }

        if (token.refreshToken) {
          const response = await refreshAccessToken(token);
          return response;
        }

        return token;
      },

      async signIn({ account, profile }) {
        console.debug("signIn");

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

      async session({ session, token }) {
        console.debug("session");
        const meInfo = await axios
          .get(`${BASE_API + Endoints.Auth}/me`, {
            headers: {
              Authorization: `${token.accessToken}`,
            },
          })
          .then((response) => response.data)
          .catch(() => ({}));
        console.debug("session meInfo " + JSON.stringify(meInfo));

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
