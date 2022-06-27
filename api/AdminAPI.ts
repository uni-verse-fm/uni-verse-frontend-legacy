import { ILogin } from './../common/types';
import { BASE_API } from "./../common/constants";
import axios from "axios";
import { Endoints } from "../common/types";

const adminLogin = async (payload: ILogin) =>
  await axios
    .post(`${BASE_API}${Endoints.Auth}/login`, payload)
    .then((response) => ({
      adminRefreshToken: response.data.refreshToken,
      adminAccessToken: response.data.accessToken,
    }))
    .catch(() => ({
      adminRefreshToken: null,
      adminAccessToken: null,
    }));

export { adminLogin };
