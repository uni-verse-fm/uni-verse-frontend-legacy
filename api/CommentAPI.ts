import { axiosClient} from "../common/contexts/AxiosContext";
import { Endoints, IUpdatePayload  } from "../common/types";

const commentEndpoint = Endoints.Comments;

const createComment = (data) => axiosClient.post(`${commentEndpoint}`, data);

const getComments = () => axiosClient.get(commentEndpoint);

const getCommentByTitle = (title) =>
  axiosClient.get(`${commentEndpoint}`, { params: { title } });

const getCommentById = (id) => axiosClient.get(`${commentEndpoint}/${id}`);

const updateComment = (param: IUpdatePayload) =>
  axiosClient.patch(`${commentEndpoint}/${param.id}`, param.data);
 
const deleteComment = (id) => axiosClient.delete(`${commentEndpoint}/${id}`);

export {
  createComment,
  getComments,
  getCommentByTitle,
  getCommentById,
  updateComment,
  deleteComment,
};
