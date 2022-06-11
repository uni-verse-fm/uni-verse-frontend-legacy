import { Endoints, IUpdatePayload } from "../common/types";
import axiosClient from "./apiClient";

const playlistEndpoint = Endoints.Playlists;

const getPlaylists = () => axiosClient.get(playlistEndpoint);

const getUserPlaylists = (id: string) => axiosClient.get(`${playlistEndpoint}/user/${id}`).then((res) => res.data);

const createPlaylist = (data) => axiosClient.post(`${playlistEndpoint}`, data);

const getPlaylistByTitle = (title) =>
  axiosClient.get(`${playlistEndpoint}`, { params: { title } });

const getPlaylistById = (id) => axiosClient.get(`${playlistEndpoint}/${id}`);

const updatePlaylist = (param: IUpdatePayload) =>
  axiosClient.patch(`${playlistEndpoint}/${param.id}`, param.data);

const deletePlaylist = (id: String) =>
  axiosClient.delete(`${playlistEndpoint}/${id}`);

const searchPlaylist = (text: string, { signal }) =>
  axiosClient
    .get(`${playlistEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export {
  createPlaylist,
  getPlaylists,
  getPlaylistByTitle,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  searchPlaylist,
  getUserPlaylists,
};
