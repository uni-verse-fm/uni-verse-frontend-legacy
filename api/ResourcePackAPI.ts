import { headers } from "./../common/constants";
import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

const resourcePackEndpoint = Endoints.ResourcePacks;

const createResourcePack = (data) =>
  axiosClient.post(`${resourcePackEndpoint}`, data, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });

const getResourcePacks = () => axiosClient.get(resourcePackEndpoint);

const getResourcePackByTitle = (title) =>
  axiosClient.get(`${resourcePackEndpoint}`, { params: { title } });

const getResourcePackById = (id) =>
  axiosClient.get(`${resourcePackEndpoint}/${id}`);

const updateResourcePack = (id, data) =>
  axiosClient.put(`${resourcePackEndpoint}/${id}`, JSON.stringify(data));

const deleteResourcePack = (id) =>
  axiosClient.delete(`${resourcePackEndpoint}/${id}`);

export {
  createResourcePack,
  getResourcePacks,
  getResourcePackByTitle,
  getResourcePackById,
  updateResourcePack,
  deleteResourcePack,
};
