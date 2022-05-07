import { Endoints } from "../common/constants";
import axiosClient from "./apiClient";

const releaseEndpoint = Endoints.Releases;

const createRelease = (data) =>
  axiosClient.post(`${releaseEndpoint}`, JSON.stringify(data));

const getReleases = () => axiosClient.get(releaseEndpoint);

const getReleaseByTitle = (title) =>
  axiosClient.get(`${releaseEndpoint}`, { params: { title } });

const getReleaseById = (id) => axiosClient.get(`${releaseEndpoint}/${id}`);

const updateRelease = (id, data) =>
  axiosClient.put(`${releaseEndpoint}/${id}`, JSON.stringify(data));

const deleteRelease = (id) => axiosClient.delete(`${releaseEndpoint}/${id}`);

export {
  createRelease,
  getReleases,
  getReleaseByTitle,
  getReleaseById,
  updateRelease,
  deleteRelease,
};
