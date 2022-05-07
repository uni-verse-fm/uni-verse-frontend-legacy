import axios from "axios";
import { BASE_API, MOCK_BASE_API } from "../common/constants";

const axiosClient = axios.create({
  baseURL: MOCK_BASE_API,
  headers: {
    Accept: "application/json",
    'Content-Type': "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status == 401) {
      //window.location.href = "https://example.com/login";
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

export default axiosClient;
