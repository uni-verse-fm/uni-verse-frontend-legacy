import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { imageSource } from "../../common/constants";

import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Track, Types } from "../../common/types";
import CreateComment from "../CreateComment";
import MenuSelectPlaylist from "./MenuSelectPlaylist";

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
      <div className="bg-grey w-full h-full flex flex-col mt-10">
        <div className=" flex flex-row mb-16 ">
          <div className="">
            <div className="flex flex-row items-end mb-1">
              <img
                src={
                  track?.release?.coverName
                    ? imageSource + track?.release.coverName
                    : "/Playlist.png"
                }
                className="rounded-lg object-cover"
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

              <div className="ml-2 bg-opacity-30 bg-gry rounded-full w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                <FontAwesomeIcon
                  className="cursor-pointer hover:scale-[1.40] hover:text-grn text-wht"
                  icon={faPlay}
                  onClick={onClickTrack(track)}
                />
              </div>
              <div className="ml-2 bg-opacity-30 bg-gry rounded-full w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                <MenuSelectPlaylist track={track} />
              </div>
            </div>
          </div>
        </div>
        <CreateComment idContent={track?.id} typeOfContent="Track" />
      </div>
    </div>
  );
};
export default ArtistTrack;
