import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/providers/PlayerProvider";
import { Track, Types } from "../../common/types";
import { isoDateYear } from "../../utils/dateUtils";
import ShowMoreMenu from "../ShowMoreMenu";

const DisplayTracksTable = ({ tracks, releaseTitle }) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickTrack = (track: Track) => () => {
    dispatch({
      type: Types.TrackPlay,
      payload: {
        className: "mt-auto",
        track: track,
      },
    });
  };

  return (
    <table className=" ml-16 mr-10 text-gry text-sm mb-5 mt-2 ">
      <thead>
        <tr className="text-grn border-b mb-10">
          <td className="py-3 "></td>
          <td className="py-3 ">Name</td>
          <td className="py-3">Artist</td>
          <td className="py-3">
            <FontAwesomeIcon className="ml-5 text-grn" icon={faClock} />
          </td>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track) => (
          <tr

            key={track.name}
            className="h-10 hover:text-wht hover:border-b hover:border-t"

          >
            <td>
              <FontAwesomeIcon
                className=" cursor-pointer hover:scale-[1.40] text-grn"
                icon={faPlay}
                onClick={onClickTrack(track)}
              />
            </td>

            <td className="cursor-pointer">{track.title}</td>
            <td>
              {track.author.username} {isoDateYear(track.createdAt)}
            </td>

            <td>4:23</td>
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
