import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Track, Types } from "../../common/types";
import { isoDateYear } from "../../utils/dateUtils";
import ShowMoreMenu from "../ShowMoreMenu";

const DisplayTracksTable = ({ tracks }) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickTrack = (track: Track) => () => {
    dispatch({
      type: Types.TrackPlay,
      payload: {
        track: track,
      },
    });
  };

  return (
    <table className="text-wht text-sm mb-5 rounded-lg bg-gry bg-opacity-50">
      <thead>
        <tr className="text-grn border-b mb-10 ">
          <td className="py-3 "></td>
          <td className="py-3 ">Name</td>
          <td className="py-3">Artist</td>
          <td className="py-3">
            <FontAwesomeIcon className="ml-5 text-grn" icon={faClock} />
          </td>
          <td className="py-3">
            
          </td>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => (
          <tr
            key={`${track.title}-${index}`}
            className="h-10 hover:bg-gry hover:bg-opacity-70 cursor-pointer  "
          >
            <td>
              <FontAwesomeIcon
                className=" cursor-pointer hover:scale-[1.40] text-grn ml-3"
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
