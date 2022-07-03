import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";


const resourceEndpoint = Endoints.Resources;
const searchResource = (text: string, { signal }) =>
  axiosClient
    .get(`${resourceEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);
export { searchResource };
