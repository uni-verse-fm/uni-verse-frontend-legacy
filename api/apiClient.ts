import axios, { AxiosError } from "axios";
import { BASE_API } from "../common/constants";
import { notify } from "../components/Notifications";

const axiosClient = axios.create({
  baseURL: BASE_API,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "http://localhost:3005",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Set-Cookie",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError): Promise<AxiosError> {
    console.log("apiClient: " + error.response);
    return Promise.reject(error);
  }
);

export default axiosClient;
