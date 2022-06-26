import React, { createContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { BASE_API, headers } from "../constants";
import { useSession } from "next-auth/react";
import { AES } from "crypto-js";

export const axiosAuthClient = axios.create({
  baseURL: BASE_API,
  headers: { ...headers },
  withCredentials: true,
});

export const axiosClient = axios.create({
  baseURL: BASE_API,
  headers: { ...headers },
});

export const axiosAdminClient = axios.create({
  baseURL: BASE_API,
  headers: { ...headers },
});

const AxiosContext = createContext({ axiosAuthClient, axiosClient });
const { Provider } = AxiosContext;

const adminRefreshAuthLogic =
  (adminRefreshToken: string) => async (failedRequest: any) => await axios
      .get(`${BASE_API}/auth/refresh`, {
        headers: {
          Authorization: adminRefreshToken,
        },
      })
      .then(async (tokenRefreshResponse) => {
        const encryptedToken = AES.encrypt(
          tokenRefreshResponse.data.accessToken as string,
          process.env.UNIVERSE_PRIVATE_KEY
        );
        failedRequest.response.config.headers = {
          ...failedRequest.response.config.headers,
          Authorization: `${encryptedToken}`,
        };

        return Promise.resolve();
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })

const refreshAuthLogic = (refreshToken) => async (failedRequest: any) => await axios
    .get(`${BASE_API}/auth/refresh`, {
      headers: {
        Authorization: refreshToken,
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
    })

const AxiosProvider = (props: any) => {
  const [adminRefreshToken, setAdminRefreshToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  const { data: session } = useSession();

  useEffect(() => {
    props.adminRefreshToken && setAdminRefreshToken(props.adminRefreshToken);
    session?.refreshToken && setRefreshToken(session?.refreshToken as string);
  }, [props.adminRefreshToken, session?.refreshToken]);

  refreshToken &&
    createAuthRefreshInterceptor(axiosClient, refreshAuthLogic(refreshToken));

  adminRefreshToken &&
    createAuthRefreshInterceptor(
      axiosAdminClient,
      adminRefreshAuthLogic(adminRefreshToken)
    );

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
