import { Endoints } from "../common/types";
import axiosClient from "./apiClient";

const trackEndpoint = Endoints.Tracks;
const getTrackById = (id: string) => axiosClient.get(`${trackEndpoint}/${id}`);

const searchTrack = (text: string, { signal }) =>
  axiosClient
    .get(`${trackEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export { getTrackById, searchTrack };
