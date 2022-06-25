import { BASE_API } from "./../common/constants";
import axios from "axios";
import { axiosAdminClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

export const refresh = () => undefined;
export const adminLogin = async () =>
  await axios
    .post(`${BASE_API}${Endoints.Auth}/login`, {
      email: process.env.UNIVERSE_EMAIL,
      password: process.env.UNIVERSE_PASSWORD,
    })
    .then((response) => ({
      adminRefreshToken: response.data.refreshToken,
      adminAccessToken: response.data.accessToken,
    }))
    .catch((error) => ({
      adminRefreshToken: null,
      adminAccessToken: null,
    }));
export const addView = async (trackId: string) => {
  await axiosAdminClient.post(`${Endoints.Views}`, {
    trackId,
  });
};
