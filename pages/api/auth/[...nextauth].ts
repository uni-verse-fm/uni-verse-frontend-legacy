import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosClient from "../../../api/apiClient";
import { login } from "../../../api/AuthAPI";
import * as cookie from "cookie";

async function refreshAccessToken(token) {
  axiosClient.defaults.headers["cookie"] = cookie.serialize(
    "Refresh",
    token.refreshToken
  );
  return await axiosClient.get("/auth/refresh").then((response) => {
    if (axiosClient.defaults.headers.common["set-cookie"]) {
      delete axiosClient.defaults.headers.common["set-cookie"];
    }

    axiosClient.defaults.headers["cookie"] = cookie.serialize(
      "Authentication",
      response.data.accessToken
    );

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
        name: "my-project",
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
    ],
    secret: process.env.JWT_SECRET,
    pages: {
      signIn: "/Login",
    },
    callbacks: {
      async jwt({ token, user, account }) {
        if (account && user) {
          return refreshAccessToken({
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            accessTokenExpires: user.accessTokenExpires,
            user,
          });
        }

        return token;
      },

      async redirect({ url }) {
        const baseUrl = process.env.REACT_APP_API_URL
        if (url.startsWith("/")) return `${baseUrl}${url}`
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },

      async session({ session, token }) {
        session = {
          ...session.user,
          ...token,
        };
        session.userId = session.user.id;
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
