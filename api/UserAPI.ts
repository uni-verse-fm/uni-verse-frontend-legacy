import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

const userEndpoint = Endoints.Users;

const getUsers = () => axiosClient.get(userEndpoint);

const getUserByUsername = (username) =>
  axiosClient.get(`${userEndpoint}`, { params: { username } });

const getUserById = (id: string) => axiosClient.get(`${userEndpoint}/${id}`);

const updateUser = (id, data) =>
  axiosClient.put(`${userEndpoint}/${id}`, JSON.stringify(data));

const deleteUser = () => (id) => axiosClient.delete(`${userEndpoint}/${id}`);

const onboardUser = () => axiosClient.post(`${userEndpoint}/onboard`);

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
  onboardUser,
};
