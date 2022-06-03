import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as cookie from "cookie";
import * as setCookie from "set-cookie-parser";
import { BASE_API } from "../common/constants";

const headers = {
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "http://localhost:3005",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Set-Cookie",
};

const axiosClient = axios.create({
  baseURL: BASE_API,
  headers: { ...headers },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }
);

createAuthRefreshInterceptor(axiosClient, (failedRequest) =>
  axiosClient.get("/auth/refresh").then((resp) => {

    if (axiosClient.defaults.headers.common["set-cookie"]) {
      delete axiosClient.defaults.headers.common["set-cookie"];
    }

    const responseCookie = setCookie.parse(resp.headers["set-cookie"])[0];

    axiosClient.defaults.headers.common["set-cookie"] =
      resp.headers["set-cookie"][0];

    axiosClient.defaults.headers.common["cookie"] = cookie.serialize(
      responseCookie.name,
      responseCookie.value
    );

    return Promise.resolve();
  })
);

export default axiosClient;
