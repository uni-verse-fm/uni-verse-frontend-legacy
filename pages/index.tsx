import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { adminLogin } from "../api/AdminAPI";
import { hotTracks, hotReleases } from "../api/ViewsAPI";
import { hotCommentedTracks } from "../api/CommentAPI";
import { HotViews, ILogin, Pages, Track } from "../common/types";
import TrackRow from "../components/SearchBar/TrackRow";
import ReleaseRow from "../components/SearchBar/ReleaseRow";

const today = new Date();
const lastWeek: Date = new Date(new Date().setDate(today.getDate() - 7));
const lastMonth: Date = new Date(new Date().setDate(today.getDate() - 30));
const lastYear: Date = new Date(new Date().setDate(today.getDate() - 365));

const weekHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastWeek.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

const monthHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastMonth.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

const monthCommentsHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastMonth.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

const yearHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastYear.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

const yearHotReleasesParams: HotViews = {
  limit: 20,
  startDate: lastYear.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

export default function Home() {
  const router = useRouter();

  const weekHotTracksQuery = useQuery(
    "week-hot-tracks",
    hotTracks(weekHotTracksParams)
  );

  const monthHotTracksQuery = useQuery(
    "month-hot-tracks",
    hotTracks(monthHotTracksParams)
  );

  const yearHotReleasesQuery = useQuery(
    "year-hot-releases",
    hotReleases(yearHotReleasesParams)
  );

  const yearHotTracksQuery = useQuery(
    "year-hot-tracks",
    hotTracks(monthHotTracksParams)
  );

  const monthHotCommentQuery = useQuery(
    "month-hot-comments",
    hotCommentedTracks(monthCommentsHotTracksParams)
  );

  const onClickDisplayTrack = (track: Track) => () => {
    router.push({
      pathname: `/${Pages.Track}`,
      query: { track: JSON.stringify(track) },
    });
  };

  const onClickDisplayRelease = (release: any) => () => {
    router.push({
      pathname: `/${Pages.Track}`,
      query: { track: JSON.stringify(release) },
    });
  };

  return (
    <div className="flex flex-col p-16 bg-drk w-full h-full overflow-y-scroll overflow-x-hidden z-0">
      <div className="flex flex-row grow w-full h-auto">
        <div className="grow m-2 rounded-xl p-4">
          <h1 className="text-grn">Week hot tracks</h1>
          <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-fakeBlr shadow-lg">
            {weekHotTracksQuery.status === "success" &&
              weekHotTracksQuery.data.map((track, index) => (
                <li key={"track-" + index} value={track}>
                  <TrackRow
                    track={track}
                    onClickDisplayTrack={onClickDisplayTrack(track)}
                    disableHover={true}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="grow m-2 rounded-xl p-4">
          <h1 className="text-grn">Month hot tracks</h1>
          <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-fakeBlr shadow-lg">
            {monthHotTracksQuery.status === "success" &&
              monthHotTracksQuery.data.map((track, index) => (
                <li key={"track-" + index} value={track}>
                  <TrackRow
                    track={track}
                    onClickDisplayTrack={onClickDisplayTrack(track)}
                    disableHover={true}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="grow m-2 rounded-xl p-4">
          <h1 className="text-grn">Year hot tracks</h1>
          <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-gry/60 bg-fakeBlr shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {yearHotTracksQuery.status === "success" &&
              yearHotTracksQuery.data.map((track, index) => (
                <li key={"track-" + index} value={track}>
                  <TrackRow
                    track={track}
                    onClickDisplayTrack={onClickDisplayTrack(track)}
                    disableHover={true}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-row grow w-full h-auto">
        <div className="grow m-2 rounded-xl p-4">
          <h1 className="text-grn">Year hot releases</h1>
          <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-fakeBlr shadow-lg">
            {yearHotReleasesQuery.status === "success" &&
              yearHotReleasesQuery.data.map((release, index) => (
                <li key={"release-" + index} value={release}>
                  <ReleaseRow
                    release={release}
                    onClickDisplayRelease={onClickDisplayRelease(release)}
                    disableHover={true}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="grow m-2 rounded-xl p-4">
          <h1 className="text-grn">Month most commented tracks</h1>
          <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-fakeBlr shadow-lg">
            {monthHotCommentQuery.status === "success" &&
              monthHotCommentQuery.data.map((track, index) => (
                <li key={"track-" + index} value={track}>
                  <TrackRow
                    track={track}
                    onClickDisplayTrack={onClickDisplayTrack(track)}
                    disableHover={true}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const payload: ILogin = {
    email: process.env.UNIVERSE_EMAIL,
    password: process.env.UNIVERSE_PASSWORD,
  };
  const adminRefreshToken = await adminLogin(payload).then(
    (response) => response.adminRefreshToken
  );

  await queryClient.prefetchQuery(
    "week-hot-tracks",
    hotTracks(weekHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "month-hot-tracks",
    hotTracks(monthHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "month-hot-comments",
    hotCommentedTracks(monthCommentsHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "year-hot-tracks",
    hotTracks(yearHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "year-hot-releases",
    hotReleases(yearHotReleasesParams)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      adminRefreshToken,
    },
  };
}
