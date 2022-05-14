import { Endoints, Pages } from "../common/constants";
import { ILogin } from "../components/LoginForm/LoginForm";
import { IRegister } from "../components/RegisterForm/RegisterForm";
import axiosClient from "./apiClient";

const authEndpoint = Endoints.Auth;

const register = (data: IRegister) =>
  axiosClient.post(`${authEndpoint}/register`, data);
const login = (data: ILogin) => axiosClient.post(`${authEndpoint}/login`, data);
const logout = () => axiosClient.post(`${authEndpoint}/logout`);
const me = () => axiosClient.get(`${authEndpoint}/me`);

export { register, login, logout, me };