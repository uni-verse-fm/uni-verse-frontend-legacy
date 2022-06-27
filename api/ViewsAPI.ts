import { axiosAdminClient, axiosClient } from "../common/contexts/AxiosContext";
import { Endoints, HotViews } from "../common/types";

const hotViews = (params: HotViews) => () =>
  axiosClient.get(
    `${Endoints.Views}/stats/${params.limit}/${params.startDate}/${params.endDate}`
  ).then((response) => response.data);

const addView = async (trackId: string) => {
  await axiosAdminClient.post(`${Endoints.Views}`, {
    trackId,
  });
};

export { hotViews, addView };
