import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

const TransactionsEndpoint = Endoints.Transactions;

const getSumDonations = (destId: string) =>
  axiosClient
    .get(`${TransactionsEndpoint}/donation/${destId}`)
    .then((res) => res.data);

const isOwnerProduct = (productId: string) =>
  axiosClient
    .get(`${TransactionsEndpoint}/owner/${productId}`)
    .then((res) => res.data);

export { getSumDonations, isOwnerProduct };
