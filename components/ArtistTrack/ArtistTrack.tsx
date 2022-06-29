import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { imageSource } from "../../common/constants";

import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Track, Types } from "../../common/types";
import CreateComment from "../CreateComment";

export const featsToString = (feats: any[]) =>
  feats && "feat. " + feats.map((feat) => feat.username).join(",");
const ArtistTrack = ({ track }) => {
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
    <div>
      <div className="bg-grey w-full h-full flex flex-col">
        <div className="ml-10 flex flex-row ">
          <div className="ml-5 ">
            <div className="flex flex-row items-end mb-1">
              <img
                src={
                  track?.release?.coverName
                    ? imageSource + track?.release.coverName
                    : "/Playlist.png"
                }
                className="rounded-lg"
                width={200}
                height={200}
                alt="Track cover"
              />
              <div>
                <div className="text-3xl font-bold text-white mx-2">
                  {track?.title}
                </div>
                <div className="text-xl font-bold text-grn mx-2">
                  By {track?.author?.username}
                </div>
                <div className="text-md font-bold text-grn mx-2">{`(Release: ${track?.release?.title})`}</div>
              </div>
              {track?.feats?.length > 0 && (
                <div className="text-md font-bold text-grn mx-2">{`${featsToString(
                  track.feats
                )}`}</div>
              )}

              <div className="text-grn ml-5">
                <FontAwesomeIcon
                  className="cursor-pointer hover:scale-[1.40] text-wht hover:text-grn fa-2xl"
                  icon={faPlay}
                  onClick={onClickTrack(track)}
                />
              </div>
            </div>
          </div>
        </div>
        <CreateComment idContent={track?.id} />
      </div>
    </div>
  );
};
export default ArtistTrack;
