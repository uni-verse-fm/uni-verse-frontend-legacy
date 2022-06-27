import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Track, Types } from "../../common/types";
import Image from "next/image";
import { imageSource } from "../../common/constants";

interface ITrackRow {
  track: Track;
  onClickDisplayTrack: (track: Track) => () => void;
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
        !disableHover && "hover:bg-grn hover:bg-opacity-10 hover:text-lg"
      } cursor-pointer text-md group items-center px-2 py-2 font-semibold text-gryf flex items-center justify-between`}
    >
      <div
        onClick={onClickDisplayTrack(track)}
        className="flex items-center grow"
      >
        <Image
          src={
            track?.release?.coverName
              ? imageSource + track?.release.coverName
              : "/Playlist.png"
          }
          className="rounded-lg m-5"
          width={70}
          height={70}
          alt="Track cover"
        />
        <div className="m-3">
          <div>{`${track.author?.username} - ${track.title} ft.${track.feats
            .map((feat) => ` ${feat.username}`)
            .join()}`}</div>
          <div className="text-grn text-sm">{track.views} str</div>
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
