import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints, IResourceInfo } from "../common/types";

const commentEndpoint = Endoints.Comments;

const createComment = (data) => axiosClient.post(`${commentEndpoint}`, data);

const getComments = () => axiosClient.get(commentEndpoint);

const getCommentByTitle = (title) =>
  axiosClient.get(`${commentEndpoint}`, { params: { title } });

const getResourceComments = (resourceInfo: IResourceInfo) =>
  axiosClient.get(
    `${commentEndpoint}/${resourceInfo.typeOfContent}/${resourceInfo.contentId}`
  );

const getCommentById = (id) => axiosClient.get(`${commentEndpoint}/${id}`);

const updateComment = (id, data) =>
  axiosClient.put(`${commentEndpoint}/${id}`, JSON.stringify(data));

const deleteComment = (id) => axiosClient.delete(`${commentEndpoint}/${id}`);

export {
  createComment,
  getComments,
  getCommentByTitle,
  getCommentById,
  updateComment,
  deleteComment,
  getResourceComments
};
