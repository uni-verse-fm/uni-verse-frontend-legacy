import axios from "axios";
import { BASE_API } from "../common/constants";
import { Endoints, ILogin, IRegister } from "../common/types";
import axiosClient from "./apiClient";

const authEndpoint = Endoints.Auth;

interface IGoogleAuth {
  username: string;
  email: string;
}

const register = (data: IRegister) =>
  axios.post(`${BASE_API}${authEndpoint}/register`, data);
const googleAuth = (data: IGoogleAuth) =>
  axiosClient.post(`${authEndpoint}/google`, data);
const login = (data: ILogin) => axiosClient.post(`${authEndpoint}/login`, data);
const logout = () => axiosClient.post(`${authEndpoint}/logout`);
const me = () => axiosClient.get(`${authEndpoint}/me`);

export { register, login, logout, me, googleAuth };
