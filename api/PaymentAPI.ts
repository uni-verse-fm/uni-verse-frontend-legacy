import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

const authEndpoint = Endoints.Payments;

export interface IDonate {
  amount: number;
  donationProductId?: string;
  connectedAccountId?: string;
}

export interface IPurchase {
  priceId: string;
  connectedAccountId?: string;
}

export interface IAddCard {
  source: string;
}

const donate = (data: IDonate) =>
  axiosClient.post(`${authEndpoint}/donate`, data);
const purchase = (data: IPurchase) =>
  axiosClient.post(`${authEndpoint}/purshase`, data);
const accountDetails = () => axiosClient.get(`${authEndpoint}/account/me`);

export { donate, purchase, accountDetails };
