import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Types } from "../../common/types";

const PlaylistRow = ({ playlist, onClickDisplayPlaylist }) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickPlaylist = (playlist) => () => {
    dispatch({
      type: Types.PlaylistPlay,
      payload: {
        tracks: playlist.tracks || [],
        trackIndex: 0,
      },
    });
  };

  return (
    <div
      onClick={onClickDisplayPlaylist(playlist)}
      className="cursor-pointer hover:bg-grn rounded-lg hover:bg-opacity-10 hover:text-lg text-md group items-center p-2 font-semibold text-gryf flex items-center justify-between"
    >
      <div
        onClick={onClickDisplayPlaylist(playlist)}
        className="flex items-center grow text-grn text-md"
      >
        <img
          src="/Playlist.png"
          className="rounded-lg object-cover w-20 h-20 mr-2"
          alt="Release"
        />
        {playlist.title}
      </div>
      <FontAwesomeIcon
        className="cursor-pointer mr-5 hover:scale-[1.40] text-grn fa-xl"
        icon={faPlay}
        onClick={onClickPlaylist(playlist)}
      />
    </div>
  );
};

export default PlaylistRow;
