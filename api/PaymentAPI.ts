import { Endoints, Pages } from "../common/constants";
import { ILogin } from "../components/LoginForm/LoginForm";
import { IRegister } from "../components/RegisterForm/RegisterForm";
import axiosClient from "./apiClient";

const authEndpoint = Endoints.Payments;

const donate = (data: IRegister) =>
  axiosClient.post(`${authEndpoint}/donate`, data);
const buyResource = (data: ILogin) => axiosClient.post(`${authEndpoint}`, data);

export { donate, buyResource };