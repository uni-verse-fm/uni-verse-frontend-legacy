import { Endoints } from "../common/constants";
import axiosClient from "./apiClient";

const trackEndpoint = Endoints.Tracks;
const getTrackById = (id: string) => axiosClient.get(`${trackEndpoint}/${id}`);

export default getTrackById;
