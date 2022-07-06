import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

const FeatRequestsEndpoint = Endoints.Transactions;

const findSentRequestId = () =>
  axiosClient.get(`${FeatRequestsEndpoint}/sent`).then((res) => res.data).then((res) => res.data);

const findRecievedRequestId = () =>
  axiosClient.get(`${FeatRequestsEndpoint}/received`).then((res) => res.data).then((res) => res.data);

const acceptRequest = (requestId: string) =>
  axiosClient.post(`${FeatRequestsEndpoint}/accept/${requestId}`);

const refuseRequest = (requestId: string) =>
  axiosClient.post(`${FeatRequestsEndpoint}/refuse/${requestId}`);

export {
  findSentRequestId,
  findRecievedRequestId,
  acceptRequest,
  refuseRequest,
};
