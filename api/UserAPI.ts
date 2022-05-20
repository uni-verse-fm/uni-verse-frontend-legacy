import { Endoints } from "../common/constants";
import axiosClient from "./apiClient";

const userEndpoint = Endoints.Users;

const getUsers = () => axiosClient.get(userEndpoint);

const getUserByUsername = (username) =>
  axiosClient.get(`${userEndpoint}`, { params: { username } });

const getUserById = (id) => axiosClient.get(`${userEndpoint}/${id}`);

const updateUser = (id, data) =>
  axiosClient.put(`${userEndpoint}/${id}`, JSON.stringify(data));

const deleteUser = () => (id) => axiosClient.delete(`${userEndpoint}/${id}`);

const searchUsers = (text: string, { signal }) =>
  axiosClient
    .get(`${userEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export {
  getUsers,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
};
