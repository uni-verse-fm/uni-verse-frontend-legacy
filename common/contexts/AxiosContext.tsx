import React, { createContext } from "react";
import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { BASE_API } from "../constants";
import { useSession } from "next-auth/react";

const headers = {
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": BASE_API,
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, Authorization, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Set-Cookie",
};

export const axiosAuthClient = axios.create({
  baseURL: BASE_API,
  headers: { ...headers },
  withCredentials: true,
});

export const axiosClient = axios.create({
  baseURL: BASE_API,
  headers: { ...headers },
});

const AxiosContext = createContext({ axiosAuthClient, axiosClient });
const { Provider } = AxiosContext;

const AxiosProvider = (props: any) => {
  const { data: session } = useSession();

  axiosAuthClient.interceptors.request.use(
    (config) => {
      if (!config.headers?.Authorization) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${session.refreshToken}`,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    return await axios
      .get(`${BASE_API}/auth/refresh`, {
        headers: {
          Authorization: session.refreshToken as string,
        },
      })
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers = {
          ...failedRequest.response.config.headers,
          Authorization: `${tokenRefreshResponse.data.accessToken}`,
        };

        return Promise.resolve();
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  };

  createAuthRefreshInterceptor(axiosClient, refreshAuthLogic);

  return (
    <Provider
      value={{
        axiosAuthClient,
        axiosClient,
      }}
    >
      {props.children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
