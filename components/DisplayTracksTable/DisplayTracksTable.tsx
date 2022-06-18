import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/providers/PlayerProvider";
import { Track, Types } from "../../common/types";
import { isoDateToDate } from "../../utils/dateUtils";

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
          <td className="py-3 ">Album</td>
          <td className="py-3">Creation date</td>
          <td className="py-3">
            <FontAwesomeIcon className="ml-5 text-grn" icon={faClock} />
          </td>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track) => (
          <tr
            key={track.title}
            className="h-10 cursor-pointer hover:text-wht hover:border-b hover:border-t"
          >
            <td>
              <FontAwesomeIcon
                className=" cursor-pointer hover:scale-[1.40] text-grn"
                icon={faPlay}
                onClick={onClickTrack(track)}
              />
            </td>
            <td>{track.title}</td>
            <td>{releaseTitle}</td>
            <td>{isoDateToDate(track.createdAt)}</td>
            <td>4:23</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTracksTable;
