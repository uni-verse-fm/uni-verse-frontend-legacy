import { faPlay, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "@headlessui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { searchPlaylist } from "../../api/PlaylistAPI";
import { searchRelease } from "../../api/ReleaseAPI";
import { searchTrack } from "../../api/TrackAPI";
import { searchUsers } from "../../api/UserAPI";
import { PlayerContext } from "../../common/providers/PlayerProvider";
import router from "next/router";
import { me } from "../../api/AuthAPI";
import { notify } from "../Notifications";
import { Pages, Track, Types } from "../../common/types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchBar = ({ isConnected }) => {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>();
  const { dispatch } = useContext(PlayerContext);
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

  const { status, data } = useQuery("me", () => me().then((res) => res.data), {
    onSuccess: (res) => {
      if (res.status === 401) {
        notify("get your profile");
      }
    },
  });

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

  const userQuery = useQuery(
    ["searchUsers", query],
    ({ signal }) => searchUsers(query, { signal }),
    {
      enabled: Boolean(query),
    }
  );

  const onClickTrack = (track: Track) => () => {
    dispatch({
      type: Types.TrackPlay,
      payload: {
        className: "mt-auto",
        track: track,
      },
    });
  };

  const onClickRelease = (release) => () => {
    dispatch({
      type: Types.ReleasePlay,
      payload: {
        tracks: release.tracks || [],
        className: "mt-auto",
        trackIndex: 0,
      },
    });
  };

  const onClickPlaylist = (playlist) => () => {
    dispatch({
      type: Types.ReleasePlay,
      payload: {
        tracks: playlist.tracks || [],
        className: "mt-auto",
        trackIndex: 0,
      },
    });
  };

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
      query: { id: track._id, track: track },
    });
    setQuery("");
  };

  return (
    <div ref={ref}>
      <div className="h-full flex xs:w-max w-full p-3">
        <div className="h-8 my-auto p-1 pl-2 bg-grn rounded-l-full">
          <FontAwesomeIcon icon={faSearch} className="text-white h-full" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full h-8 px-4 rounded-r-full text-black my-auto bg-white focus:ring-1 focus:ring-grn focus:outline-none focus:border-sky-500"
          value={query}
          onChange={onInputChange}
        />
      </div>
      <Tab.Group>
        {isMenuOpen && (
          <Tab.List className="flex rounded-xl p-1 bg-white h-8 mt-3">
            <Tab
              key="Tracks"
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg text-sm font-medium leading-5 text-grn text-lg",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-grn focus:outline-none focus:ring-2 font-semibold",
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-grn/[0.12] hover:text-segrn"
                )
              }
            >
              Tracks
            </Tab>
            <Tab
              key="Releases"
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg text-sm font-medium leading-5 text-grn text-lg",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-grn focus:outline-none focus:ring-2 font-semibold",
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-grn/[0.12] hover:text-segrn"
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
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-grn focus:outline-none focus:ring-2 font-semibold",
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-grn/[0.12] hover:text-segrn"
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
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-grn focus:outline-none focus:ring-2 font-semibold",
                    selected
                      ? "bg-white shadow"
                      : "text-black hover:bg-grn/[0.12] hover:text-segrn"
                  )
                }
              >
                Users
              </Tab>
            )}
          </Tab.List>
        )}
        <Tab.Panels>
          <Tab.Panel>
            <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {taskQuery.status === "success" &&
                taskQuery.data.map((track, index) => (
                  <li key={"track-" + index} value={track}>
                    <div
                      onClick={onClickDisplayTrack(track)}
                      className="hover:bg-grn cursor-pointer hover:bg-opacity-25 hover:text-lg text-md group items-center px-2 py-2 font-semibold text-gryf flex items-center justify-between"
                    >
                      {`${track.author?.username} - ${
                        track.title
                      } ft.${track.feats
                        .map((feat) => ` ${feat.username}`)
                        .join()}`}
                      <FontAwesomeIcon
                        className="cursor-pointer mr-5 hover:scale-[1.40] text-grn"
                        icon={faPlay}
                        onClick={onClickTrack(track)}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel>
            <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {releaseQuery.status === "success" &&
                releaseQuery.data.map((release, index) => (
                  <li key={"release-" + index} value={release}>
                    <div
                      onClick={onClickDisplayRelease(release)}
                      className="hover:bg-grn cursor-pointer hover:bg-opacity-25 hover:text-lg text-md group items-center px-2 py-2 font-semibold text-gryf flex items-center justify-between"
                    >
                      {`${release.title} by ${release.author?.username}`}
                      <FontAwesomeIcon
                        className="cursor-pointer mr-5 hover:scale-[1.40] text-grn"
                        icon={faPlay}
                        onClick={onClickRelease(release)}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel>
            <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {playlistQuery.status === "success" &&
                playlistQuery.data.map((playlist, index) => (
                  <li key={"playlist-" + index} value={playlist}>
                    <div
                      onClick={onClickDisplayPlaylist(playlist)}
                      className="hover:bg-grn cursor-pointer hover:bg-opacity-25 hover:text-lg text-md group items-center px-2 py-2 font-semibold text-gryf flex items-center justify-between"
                    >
                      {playlist.title}
                      <FontAwesomeIcon
                        className="cursor-pointer mr-5 hover:scale-[1.40] text-grn"
                        icon={faPlay}
                        onClick={onClickPlaylist(playlist)}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel>
            <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userQuery.status === "success" &&
                userQuery.data.map((user, index) => (
                  <li key={"user-" + index} value={user}>
                    <div
                      onClick={onClickDisplayUser(user)}
                      className="hover:bg-grn cursor-pointer hover:bg-opacity-25 hover:text-lg text-md group items-center px-2 py-2 font-semibold text-gryf flex items-center justify-between"
                    >
                      {`${user.username} - ${user.email}`}
                    </div>
                  </li>
                ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SearchBar;
