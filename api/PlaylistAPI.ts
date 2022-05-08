import { Endoints } from "../common/constants";
import axiosClient from "./apiClient";

const playlistEndpoint = Endoints.Playlists;

const getPlaylists =  () =>  axiosClient.get(playlistEndpoint);

const createPlaylist =  (data) =>
   axiosClient.post(`${playlistEndpoint}`, JSON.stringify(data));

const getPlaylistByTitle =  (title) =>
   axiosClient.get(`${playlistEndpoint}`, { params: { title } });

const getPlaylistById =  (id) =>  axiosClient.get(`${playlistEndpoint}/${id}`);

const updatePlaylist =  (id, data) =>
   axiosClient.put(`${playlistEndpoint}/${id}`, JSON.stringify(data));

const deletePlaylist =  (id) =>  axiosClient.delete(`${playlistEndpoint}/${id}`);

export {
  createPlaylist,
  getPlaylists,
  getPlaylistByTitle,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
