import { faEye, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { imageSource } from "../../common/constants";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Types } from "../../common/types";

const countReleaseViews = (tracks: any[]) => {
  const length = tracks.length;
  const totalViews = tracks
    .map((track) => parseInt(track.views))
    .reduce((previousValue, value) => previousValue + value);
  return Math.floor(totalViews / length);
};

interface IReleaseRow {
  release: any;
  onClickDisplayRelease: () => void;
  disableHover?: boolean;
}

const ReleaseRow = ({
  release,
  onClickDisplayRelease,
  disableHover,
}: IReleaseRow) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickRelease = (release) => () => {
    dispatch({
      type: Types.ReleasePlay,
      payload: {
        tracks: release.tracks || [],
        trackIndex: 0,
      },
    });
  };

  return (
    <div
      className={`${
        !disableHover && "hover:text-lg"
      } hover:bg-grn hover:bg-opacity-10 rounded-lg text-md group items-center p-2 font-semibold text-gryf flex items-center justify-between cursor-pointer`}
    >
      <div onClick={onClickDisplayRelease} className="flex items-center grow">
        <img
          src={
            release.coverName ? imageSource + release.coverName : "/Playlist.png"
          }
          className="rounded-lg object-cover w-20 h-20"
          alt="Release"
        />
        <div className="m-3">
          <div className="text-mdrk text-md">
            {`${release.title} by ${release.author?.username}`}
          </div>
          {!release.views && (
            <div className="text-grn text-sm">
              {countReleaseViews(release.tracks)}
              <FontAwesomeIcon
                className="cursor-pointer mx-2 hover:scale-[1.40] text-grnfa-sm fa-xs"
                icon={faEye}
              />
            </div>
          )}
          {!!release.views && (
            <div className="text-grn text-sm">
              {release.views / (release.tracks?.length || 1)}
              <FontAwesomeIcon
                className="cursor-pointer mx-2 hover:scale-[1.40] text-grnfa-sm fa-xs"
                icon={faEye}
              />
            </div>
          )}
        </div>
      </div>

      <FontAwesomeIcon
        className="cursor-pointer mr-5 hover:scale-[1.40] text-grn fa-xl"
        icon={faPlay}
        onClick={onClickRelease(release)}
      />
    </div>
  );
};

export default ReleaseRow;
