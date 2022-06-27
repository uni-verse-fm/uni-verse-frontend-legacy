import { BASE_API } from "./../common/constants";
import axios from "axios";
import { Endoints } from "../common/types";

const adminLogin = async () =>
  await axios
    .post(`${BASE_API}${Endoints.Auth}/login`, {
      email: process.env.UNIVERSE_EMAIL,
      password: process.env.UNIVERSE_PASSWORD,
    })
    .then((response) => ({
      adminRefreshToken: response.data.refreshToken,
      adminAccessToken: response.data.accessToken,
    }))
    .catch(() => ({
      adminRefreshToken: null,
      adminAccessToken: null,
    }));

export { adminLogin };
