import { faComment, faEye, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Track, Types } from "../../common/types";
import { imageSource } from "../../common/constants";

interface ITrackRow {
  track: Track;
  onClickDisplayTrack: () => void;
  disableHover?: boolean;
}

const TrackRow = ({ track, onClickDisplayTrack, disableHover }: ITrackRow) => {
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
    <div
      className={`${
        !disableHover && "hover:text-lg"
      } hover:bg-grn hover:bg-opacity-10 rounded-lg text-md group items-center p-2 font-semibold text-gryf flex items-center justify-between cursor-pointer`}
    >
      <div onClick={onClickDisplayTrack} className="flex items-center grow">
        <img
          src={
            track?.release?.coverName
              ? imageSource + track?.release.coverName
              : "/Playlist.png"
          }
          className="rounded-lg w-20 h-20"
          alt="Track cover"
        />

        <div className="m-3">
          <div className="text-sedrk text-lg">{`${track.author?.username} - ${
            track.title
          } ft.${track.feats?.map((feat) => ` ${feat.username}`).join()}`}</div>
          {!!track.views && (
            <div className="text-grn text-sm">
              {track.views}
              <FontAwesomeIcon
                className="cursor-pointer mx-2 hover:scale-[1.40] text-grnfa-sm fa-xs"
                icon={faEye}
              />
            </div>
          )}
          {!!track.comments && (
            <div className="text-grn text-sm">
              {track.comments}
              <FontAwesomeIcon
                className="cursor-pointer mx-2 hover:scale-[1.40] text-grnfa-sm fa-xs"
                icon={faComment}
              />
            </div>
          )}
        </div>
      </div>
      <FontAwesomeIcon
        className="cursor-pointer mr-5 hover:scale-[1.40] text-grn text-md fa-xl"
        icon={faPlay}
        onClick={onClickTrack(track)}
      />
    </div>
  );
};

export default TrackRow;
