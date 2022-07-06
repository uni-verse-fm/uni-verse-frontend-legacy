import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

const FeatRequestsEndpoint = Endoints.FeatRequests;

const findSentRequestId = () =>
  axiosClient.get(`${FeatRequestsEndpoint}/sent`).then((res) => res.data);

const findReceivedRequestId = () =>
  axiosClient.get(`${FeatRequestsEndpoint}/received`).then((res) => res.data);

const acceptRequest = (requestId: string) =>
  axiosClient.patch(`${FeatRequestsEndpoint}/accept/${requestId}`);

const refuseRequest = (requestId: string) =>
  axiosClient.patch(`${FeatRequestsEndpoint}/refuse/${requestId}`);

export {
  findSentRequestId,
  findReceivedRequestId,
  acceptRequest,
  refuseRequest,
};
