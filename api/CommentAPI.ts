import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints, HotComments, IResourceInfo,IUpdatePayload } from "../common/types";

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

const updateComment = (param: IUpdatePayload) =>
  axiosClient.patch(`${commentEndpoint}/${param.id}`, param.data);
 
const deleteComment = (id) => axiosClient.delete(`${commentEndpoint}/${id}`);

const hotCommentedTracks = (params: HotComments) => () =>
  axiosClient
    .get(
      `${commentEndpoint}/tracks/${params.limit}/${params.startDate}/${params.endDate}`
    )
    .then((response) => response.data);

export {
  createComment,
  getComments,
  getCommentByTitle,
  getCommentById,
  updateComment,
  deleteComment,
  getResourceComments,
  hotCommentedTracks,
};
