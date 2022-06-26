import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { imageSource } from "../../common/constants";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Types } from "../../common/types";
import Image from "next/image";

const countReleaseViews = (tracks: any[]) => {
  const length = tracks.length;
  const totalViews = tracks
    .map((track) => parseInt(track.views))
    .reduce((previousValue, value) => previousValue + value);
  return Math.floor(totalViews / length);
};

const ReleaseRow = ({ release, onClickDisplayRelease }) => {
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
    <div className="hover:bg-grn cursor-pointer hover:bg-opacity-10 hover:text-lg text-md group items-center px-2 py-2 font-semibold text-gryf flex items-center justify-between">
      <div
        onClick={onClickDisplayRelease(release)}
        className="flex items-center grow"
      >
        <Image
          src={
            release.coverName ? imageSource + release.coverName : "/profile.jpg"
          }
          className="rounded-lg m-5"
          width={70}
          height={70}
          alt="Release"
        />
        <div className="m-3">
          <div> {`${release.title} by ${release.author?.username}`}</div>
          <div className="text-grn text-sm">
            {countReleaseViews(release.tracks)} str
          </div>
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
