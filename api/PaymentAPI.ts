import { Endoints } from "../common/constants";
import axiosClient from "./apiClient";

const authEndpoint = Endoints.Payments;

export interface IDonate {
  amount: number;
  paymentMethodId?: string;
  saveCard?: boolean;
}

export interface IPurchase {
  amount: number;
  paymentMethodId?: string;
  targetCustomerId: string;
  productId: string;
  saveCard?: boolean;
}

export interface IAddCard {
  source: string;
}

const donate = (data: IDonate) =>
  axiosClient.post(`${authEndpoint}/donate`, data);
const purchase = (data: IPurchase) =>
  axiosClient.post(`${authEndpoint}/charge`, data);

export { donate, purchase };
