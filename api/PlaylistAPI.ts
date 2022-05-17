import { Endoints } from "../common/constants";
import { IPlaylist } from "../components/PlayListsModal/PlayListsModal";
import axiosClient from "./apiClient";

const playlistEndpoint = Endoints.Playlists;

const getPlaylists = () => axiosClient.get(playlistEndpoint);

const createPlaylist = (data: IPlaylist) =>
  axiosClient.post(`${playlistEndpoint}`, data);

const getPlaylistByTitle = (title) =>
  axiosClient.get(`${playlistEndpoint}`, { params: { title } });

const getPlaylistById = (id) => axiosClient.get(`${playlistEndpoint}/${id}`);

const updatePlaylist = (id, data) =>
  axiosClient.put(`${playlistEndpoint}/${id}`, JSON.stringify(data));

const deletePlaylist = (id: String) => axiosClient.delete(`${playlistEndpoint}/${id}`);

export {
  createPlaylist,
  getPlaylists,
  getPlaylistByTitle,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
