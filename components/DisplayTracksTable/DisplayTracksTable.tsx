import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Track, Types } from "../../common/types";
import { isoDateYear } from "../../utils/dateUtils";
import ShowMoreMenu from "../ShowMoreMenu";
import { imageSource } from "../../common/constants";
import router from "next/router";
import { Pages } from "../../common/types";
import { TrackText } from "../SearchBar/TrackRow";

const DisplayTracksTable = ({ release }) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickTrack = (track: Track) => () => {
    dispatch({
      type: Types.TrackPlay,
      payload: {
        track: track,
      },
    });
  };

  const onClickDisplayTrack = (track) => () => {
    const releaseTrack = {
      coverName: release?.coverName,
      title: release?.title,
      id: release?.id,
      _id: release?._id,
    };

    const TrackToDisplay = {
      title: track?.title,
      feats: track?.feats,
      fileName: track?.fileName,
      author: track?.author,
      release: releaseTrack,
      views: track?.views,
      comments: track?.comments,
      isPlagia: track?.isPlagia,
      isFeatsWaiting: track?.isFeatsWaiting,
      id: track?.id,
      _id: track?._id,
    };

    router.push({
      pathname: `/${Pages.Track}`,
      query: { track: JSON.stringify(TrackToDisplay) },
    });
  };

  return (
    <table className="text-wht text-sm mb-5 rounded-lg bg-gry bg-opacity-50  ">
      <thead>
        <tr className="text-grn border-b mb-10 ">
          <td className="py-3 "></td>
          <td className="py-3 ml-24 ">
            <h2 className="ml-3 "> Track</h2>
          </td>

          <td className="py-3"></td>
        </tr>
      </thead>
      <tbody>
        {release?.tracks.map((track, index) => (
          <tr
            key={`${track?.title}-${index}`}
            className="h-10 hover:bg-gry hover:bg-opacity-70  "
          >
            <td className="flex justify-center items-center mt-5  ">
              <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                <FontAwesomeIcon
                  className=" cursor-pointer hover:scale-[1.40] text-grn "
                  icon={faPlay}
                  onClick={onClickTrack(track)}
                />
              </div>
            </td>

            <td className="cursor-pointer" onClick={onClickDisplayTrack(track)}>
              <div className="flex flex-row">
                <img
                  src={
                    track?.release?.coverName
                      ? imageSource + track?.release?.coverName
                      : "/Playlist.png"
                  }
                  className="rounded-lg object-cover m-2"
                  width={50}
                  height={50}
                  alt="Track cover"
                />
                <div className="flex flex-row items-center m-2 text-wht text-sm font-bold ">
                  <div className="mt-2 text-gryf text-sm">
                    <TrackText track={track} />
                    {isoDateYear(track?.createdAt)}
                  </div>
                  {track?.isPlagia && (
                    <h1 className="text-rd text-semibold mx-2">plagiarism</h1>
                  )}
                  {track?.isFeatsWaiting && (
                    <h1 className="text-rd text-semibold mx-2">feat X</h1>
                  )}
                </div>
              </div>
            </td>

            <td className="cursor-pointer">
              <ShowMoreMenu track={track} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTracksTable;
