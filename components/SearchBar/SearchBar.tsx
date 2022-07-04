import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { searchPlaylist } from "../../api/PlaylistAPI";
import { searchRelease } from "../../api/ReleaseAPI";
import { searchTrack } from "../../api/TrackAPI";
import { searchUsers } from "../../api/UserAPI";
import { searchRecourcesPack } from "../../api/ResourcePackAPI";
import router from "next/router";
import { Pages } from "../../common/types";
import TrackRow from "./TrackRow";
import ResourcesPackRow from "./ResourcesPackRow";
import ReleaseRow from "./ReleaseRow";
import PlaylistRow from "./PlaylistRow";

import UserRow from "./UserRow";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchBar = ({ isConnected }) => {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const onInputChange = (event) => {
    setQuery(event.target.value);
    setIsMenuOpen(true);
  };

  const taskQuery = useQuery(
    ["searchTrack", query],
    ({ signal }) => searchTrack(query, { signal }),
    {
      enabled: Boolean(query),
    }
  );

  const releaseQuery = useQuery(
    ["searchReleases", query],
    ({ signal }) => searchRelease(query, { signal }),
    {
      enabled: Boolean(query),
    }
  );

  const playlistQuery = useQuery(
    ["searchPlaylists", query],
    ({ signal }) => searchPlaylist(query, { signal }),
    {
      enabled: Boolean(query),
    }
  );

  const resourcesPacksQuery = useQuery(
    ["searchResourcesPacks", query],
    ({ signal }) => searchRecourcesPack(query, { signal }),
    {
      enabled: Boolean(query),
    }
  );

  const userQuery = useQuery(
    ["searchUsers", query],
    ({ signal }) => searchUsers(query, { signal }),
    {
      enabled: Boolean(query),
    }
  );

  const onClickDisplayPlaylist = (playlist) => () => {
    router.push({
      pathname: `/${Pages.UserPlaylist}`,
      query: { id: playlist._id },
    });
    setQuery("");
  };

  const onClickDisplayUser = (user) => () => {
    router.push({
      pathname: `/${Pages.Profile}`,
      query: { id: user._id },
    });
    setQuery("");
  };

  const onClickDisplayRelease = (release) => () => {
    router.push({
      pathname: `/${Pages.UserRelease}`,
      query: { id: release._id },
    });
    setQuery("");
  };

  const onClickDisplayTrack = (track) => () => {
    router.push({
      pathname: `/${Pages.Track}`,
      query: { track: JSON.stringify(track) },
    });
    setQuery("");
  };

  const onClickDisplayResourcesPack = (resourcesPack) => () => {
    router.push({
      pathname: `/${Pages.UserResourcePack}`,
      query: { id: resourcesPack._id },
    });
    setQuery("");
  };
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="flex flex-row items-center xs:w-max w-full m-3 z-10 border rounded-full hover:ring-2 hover:ring-grn">
        <div className="h-8 my-auto p-1 pl-2 bg-white rounded-l-full">
          <FontAwesomeIcon icon={faSearch} className="text-grn h-full" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full h-8 px-4 rounded-r-full text-black my-auto bg-white focus:outline-none focus:border-sky-500"
          value={query}
          onChange={onInputChange}
        />
      </div>
      {isMenuOpen && (
        <div className="justify-self-center w-full">
          <Tab.Group>
            <Tab.List className="flex rounded-xl p-1 bg-gry/60 backdrop-blur-md h-8 mt-3">
              <Tab
                key="Tracks"
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg text-sm font-medium leading-5 text-grn text-lg",
                    "focus:outline-none font-semibold",
                    selected
                      ? "bg-white text-drkgrn shadow"
                      : "text-grn hover:bg-white/[0.12] hover:text-segrn"
                  )
                }
              >
                Tracks
              </Tab>
              <Tab
                key="Resources"
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg text-sm font-medium leading-5 text-grn text-lg",
                    "focus:outline-none font-semibold",
                    selected
                      ? "bg-white text-drkgrn shadow"
                      : "text-grn hover:bg-white/[0.12] hover:text-segrn"
                  )
                }
              >
                Resource-packs
              </Tab>
              <Tab
                key="ResourcesPacks"
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg text-sm font-medium leading-5 text-grn text-lg",
                    "focus:outline-none font-semibold",
                    selected
                      ? "bg-white text-drkgrn shadow"
                      : "text-grn hover:bg-white/[0.12] hover:text-segrn"
                  )
                }
              >
                Releases
              </Tab>
              <Tab
                key="Playlists"
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg text-sm font-medium leading-5 text-grn text-lg",
                    "focus:outline-none font-semibold",
                    selected
                      ? "bg-white text-drkgrn shadow"
                      : "text-grn hover:bg-white/[0.12] hover:text-segrn"
                  )
                }
              >
                Playlists
              </Tab>

              {isConnected && (
                <Tab
                  key="Users"
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg text-sm font-medium leading-5 text-grn text-lg",
                      "focus:outline-none font-semibold",
                      selected
                        ? "bg-white text-drkgrn shadow"
                        : "text-grn hover:bg-white/[0.12] hover:text-segrn"
                    )
                  }
                >
                  Users
                </Tab>
              )}
            </Tab.List>

            <Tab.Panels className="mt-2 bg-gry/70 backdrop-blur-md rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 h-96 overflow-y-auto focus:outline-none">
              <Tab.Panel>
                <ul className="divide-y divide-gray-100">
                  {taskQuery.status === "success" &&
                    taskQuery.data.map((track, index) => (
                      <li key={"track-" + index} value={track} className="p-2">
                        <TrackRow
                          track={track}
                          onClickDisplayTrack={onClickDisplayTrack(track)}
                        />
                      </li>
                    ))}
                </ul>
              </Tab.Panel>
              <Tab.Panel>
                <ul className="divide-y divide-gray-100">
                  {resourcesPacksQuery.status === "success" &&
                    resourcesPacksQuery.data.map((resourcesPack, index) => (
                      <li key={"resourcesPack-" + index} value={resourcesPack}>
                        <ResourcesPackRow
                          resourcesPack={resourcesPack}
                          onClickDisplayResourcesPack={onClickDisplayResourcesPack(
                            resourcesPack
                          )}
                        />
                      </li>
                    ))}
                </ul>
              </Tab.Panel>
              <Tab.Panel>
                <ul className="divide-y divide-gray-100">
                  {releaseQuery.status === "success" &&
                    releaseQuery.data.map((release, index) => (
                      <li
                        key={"release-" + index}
                        value={release}
                        className="p-2"
                      >
                        <ReleaseRow
                          release={release}
                          onClickDisplayRelease={onClickDisplayRelease(release)}
                        />
                      </li>
                    ))}
                </ul>
              </Tab.Panel>
              <Tab.Panel>
                <ul className="divide-y divide-gray-100">
                  {playlistQuery.status === "success" &&
                    playlistQuery.data.map((playlist, index) => (
                      <li key={"playlist-" + index} value={playlist}>
                        <PlaylistRow
                          playlist={playlist}
                          onClickDisplayPlaylist={onClickDisplayPlaylist}
                        />
                      </li>
                    ))}
                </ul>
              </Tab.Panel>

              <Tab.Panel>
                <ul className="divide-y divide-gray-100">
                  {userQuery.status === "success" &&
                    userQuery.data.map((user, index) => (
                      <li key={"user-" + index} value={user}>
                        <UserRow
                          user={user}
                          onClickDisplayUser={onClickDisplayUser}
                        />
                      </li>
                    ))}
                </ul>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
