import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { adminLogin } from "../api/AdminAPI";
import { hotViews } from "../api/ViewsAPI";
import { HotViews, Pages } from "../common/types";
import TrackRow from "../components/SearchBar/TrackRow";

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

const yearHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastYear.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

export default function Home() {
  const router = useRouter();

  const weekHotQuery = useQuery(
    "week-hot-tracks",
    hotViews(weekHotTracksParams)
  );

  const monthHotQuery = useQuery(
    "month-hot-tracks",
    hotViews(monthHotTracksParams)
  );

  const yearHotQuery = useQuery(
    "year-hot-tracks",
    hotViews(monthHotTracksParams)
  );

  const onClickDisplayTrack = (track) => () => {
    router.push({
      pathname: `/${Pages.Track}`,
      query: { id: track._id },
    });
  };

  return (
    <>
      <div className="flex flex-col bg-drk w-full h-full overflow-y-scroll overflow-x-hidden">
        <div className="flex flex-col m-16 h-full">
          <div className="flex flex-row grow w-full h-auto">
            <div className="grow m-2  rounded-xl p-4">
              <h1 className="text-grn">Week hot tracks</h1>
              <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {weekHotQuery.status === "success" &&
                  weekHotQuery.data.map((track, index) => (
                    <li key={"track-" + index} value={track}>
                      <TrackRow
                        track={track}
                        onClickDisplayTrack={onClickDisplayTrack}
                        disableHover={true}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="grow m-2 rounded-xl p-4">
              <h1 className="text-grn">Month hot tracks</h1>
              <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {monthHotQuery.status === "success" &&
                  monthHotQuery.data.map((track, index) => (
                    <li key={"track-" + index} value={track}>
                      <TrackRow
                        track={track}
                        onClickDisplayTrack={onClickDisplayTrack}
                        disableHover={true}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="grow m-2 rounded-xl p-4">
              <h1 className="text-grn">Year hot tracks</h1>
              <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {yearHotQuery.status === "success" &&
                  yearHotQuery.data.map((track, index) => (
                    <li key={"track-" + index} value={track}>
                      <TrackRow
                        track={track}
                        onClickDisplayTrack={onClickDisplayTrack}
                        disableHover={true}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-row grow w-full h-auto">
            <div className="grow m-2 rounded-xl p-4">
              <h1 className="text-grn">Week hot tracks</h1>
              <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {weekHotQuery.status === "success" &&
                  weekHotQuery.data.map((track, index) => (
                    <li key={"track-" + index} value={track}>
                      <TrackRow
                        track={track}
                        onClickDisplayTrack={onClickDisplayTrack}
                        disableHover={true}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="grow m-2 rounded-xl p-4">
              <h1 className="text-grn">Month hot tracks</h1>
              <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {monthHotQuery.status === "success" &&
                  monthHotQuery.data.map((track, index) => (
                    <li key={"track-" + index} value={track}>
                      <TrackRow
                        track={track}
                        onClickDisplayTrack={onClickDisplayTrack}
                        disableHover={true}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const adminRefreshToken = await adminLogin().then(
    (response) => response.adminRefreshToken
  );

  await queryClient.prefetchQuery(
    "week-hot-tracks",
    hotViews(weekHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "month-hot-tracks",
    hotViews(monthHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "year-hot-tracks",
    hotViews(yearHotTracksParams)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      adminRefreshToken,
    },
  };
}
