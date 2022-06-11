import { Endoints } from "../common/types";
import axiosClient from "./apiClient";

const releaseEndpoint = Endoints.Releases;

const createRelease = (data) =>
  axiosClient.post(`${releaseEndpoint}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const getReleases = () => axiosClient.get(releaseEndpoint);

const getReleaseByTitle = (title: string) =>
  axiosClient.get(`${releaseEndpoint}`, { params: { title } });

const getReleaseById = (id: string) => axiosClient.get(`${releaseEndpoint}/${id}`);

const updateRelease = (id: string, data) =>
  axiosClient.put(`${releaseEndpoint}/${id}`, JSON.stringify(data));

const deleteRelease = (id: String) =>
  axiosClient.delete(`${releaseEndpoint}/${id}`);

const getUserReleases = (id: string) => axiosClient.get(`${releaseEndpoint}/user/${id}`).then((res) => res.data);

const searchRelease = (text: string, { signal }) =>
  axiosClient
    .get(`${releaseEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export {
  createRelease,
  getReleases,
  getReleaseByTitle,
  getReleaseById,
  updateRelease,
  deleteRelease,
  getUserReleases,
  searchRelease,
};
