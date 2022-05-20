import { Endoints } from "../common/constants";
import axiosClient from "./apiClient";
import { IUpdatePayload } from "../components/UpdatePlaylistForm/UpdatePlaylistForm";

const playlistEndpoint = Endoints.Playlists;

const getPlaylists = () => axiosClient.get(playlistEndpoint);

const createPlaylist = (data) => axiosClient.post(`${playlistEndpoint}`, data);

const getPlaylistByTitle = (title) =>
  axiosClient.get(`${playlistEndpoint}`, { params: { title } });

const getPlaylistById = (id) => axiosClient.get(`${playlistEndpoint}/${id}`);

const updatePlaylist = (param: IUpdatePayload) =>
  axiosClient.put(`${playlistEndpoint}/${param.id}`, param.data);

const deletePlaylist = (id) => axiosClient.delete(`${playlistEndpoint}/${id}`);

export {
  createPlaylist,
  getPlaylists,
  getPlaylistByTitle,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
