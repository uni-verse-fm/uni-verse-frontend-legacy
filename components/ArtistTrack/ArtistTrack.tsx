import React, { useContext } from "react";

import { getTrackById } from "../../api/TrackAPI";
import { useQuery } from "react-query";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Track, Types } from "../../common/types";
import CreateComment from "../CreateComment";

const ArtistTrack = (props) => {
  const { dispatch } = useContext(PlayerContext);

  const { status, data } = useQuery("track", () =>
    getTrackById(props.index).then((res) => {
      return res.data;
    })
  );

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
      <div className="Global bg-grey w-full h-full flex flex-col">
        {/*
        {status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : (
          <>
            <div className="ml-10 flex flex-row ">
              <div className="ml-5 ">
                <div className="flex flex-row mt-24 mb-1">
                  <h2 className="text-grn ">
                    {JSON.stringify(data)}
                    <FontAwesomeIcon
                      className="cursor-pointer ml-5 hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faPlay}
                      onClick={onClickTrack(data)}
                    />
                  </h2>
                </div>
                <h2 className="text-gry mb-8">{data._id}</h2>
              </div>
            </div>
          </>
        )}*/}
        <CreateComment idContent={props.index} />
      </div>
    </div>
  );
};
export default ArtistTrack;
