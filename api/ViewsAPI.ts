import { axiosAdminClient, axiosClient } from "../common/contexts/AxiosContext";
import { AddView, Endoints, HotViews } from "../common/types";

const hotTracks = (params: HotViews) => () =>
  axiosClient
    .get(
      `${Endoints.Views}/tracks/${params.limit}/${params.startDate}/${params.endDate}`
    )
    .then((response) => response.data);

const artistHotTracks = (id: string) =>
  axiosClient.get(`${Endoints.Views}/user/${id}`);

const hotReleases = (params: HotViews) => () =>
  axiosClient
    .get(
      `${Endoints.Views}/releases/${params.limit}/${params.startDate}/${params.endDate}`
    )
    .then((response) => response.data);

const addView = async (payload: AddView) => {
  await axiosAdminClient.post(`${Endoints.Views}`, payload);
};

export { hotTracks, hotReleases, addView, artistHotTracks };
