import { Endoints } from "../common/constants";
import axiosClient from "./apiClient";

const authEndpoint = Endoints.Auth;

const register =  (data) =>  axiosClient.post(`${authEndpoint}/register`, JSON.stringify(data));
const login =  (data) =>  axiosClient.post(`${authEndpoint}/login`, JSON.stringify(data));
const logout =  () =>  axiosClient.post(`${authEndpoint}/logout`);

export { register, login, logout };
