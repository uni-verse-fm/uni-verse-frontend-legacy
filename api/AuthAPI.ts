import { Endoints } from "../common/constants";
import { ILogin } from "../components/LoginForm/LoginForm";
import { IRegister } from "../components/RegisterForm/RegisterForm";
import axiosClient from "./apiClient";

const authEndpoint = Endoints.Auth;

interface IGoogleAuth {
  username: string;
  email: string;
}

const register = (data: IRegister) =>
  axiosClient.post(`${authEndpoint}/register`, data);
const googleAuth = (data: IGoogleAuth) =>
  axiosClient.post(`${authEndpoint}/google`, data);
const login = (data: ILogin) => axiosClient.post(`${authEndpoint}/login`, data);
const logout = () => axiosClient.post(`${authEndpoint}/logout`);
const me = () => axiosClient.get(`${authEndpoint}/me`);

export { register, login, logout, me, googleAuth };
