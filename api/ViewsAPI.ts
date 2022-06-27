import { axiosAdminClient, axiosClient } from "../common/contexts/AxiosContext";
import { Endoints, HotViews } from "../common/types";

const hotTracks = (params: HotViews) => () =>
  axiosClient
    .get(
      `${Endoints.Views}/tracks/${params.limit}/${params.startDate}/${params.endDate}`
    )
    .then((response) => response.data);

const hotReleases = (params: HotViews) => () =>
  axiosClient
    .get(
      `${Endoints.Views}/releases/${params.limit}/${params.startDate}/${params.endDate}`
    )
    .then((response) => response.data);

const addView = async (trackId: string) => {
  await axiosAdminClient.post(`${Endoints.Views}`, {
    trackId,
  });
};

export { hotTracks, hotReleases, addView };
