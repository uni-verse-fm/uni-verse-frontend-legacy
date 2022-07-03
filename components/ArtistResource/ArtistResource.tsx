import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { imageSource } from "../../common/constants";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Resource, Types } from "../../common/types";
import CreateComment from "../CreateComment";

const ArtistResource = ({ resource }) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickResource = (resource: Resource) => () => {
    {
      /* dispatch({
      type: Types.ResourcePlay,
      payload: {
        resource: resource,
      },
    });*/
    }
  };

  return (
    <div>
      <div className="bg-grey w-full h-full flex flex-col mt-10">
        <div className=" flex flex-row mb-16 ">
          <div className="">
            <div className="flex flex-row items-end mb-1">
              <img
                src={
                  resource?.resourcepack?.coverName
                    ? imageSource + resource?.resourcepack.coverName
                    : "/Playlist.png"
                }
                className="rounded-lg"
                width={200}
                height={200}
                alt="Resource cover"
              />
              <div>
                <div className="text-3xl font-bold text-white mx-2">
                  {resource?.title}
                </div>
                <div className="text-xl font-bold text-grn mx-2">
                  By {resource?.author?.username}
                </div>
                <div className="text-md font-bold text-grn mx-2">{`(ResourcesPack: ${resource?.resourcepack?.title})`}</div>
              </div>

              <div className="text-grn ml-5">
                <FontAwesomeIcon
                  className="cursor-pointer hover:scale-[1.40] text-wht hover:text-grn fa-2xl"
                  icon={faPlay}
                  onClick={onClickResource(resource)}
                />
              </div>
            </div>
          </div>
        </div>
        <CreateComment idContent={resource?.id} typeOfContent="Resource" />
      </div>
    </div>
  );
};
export default ArtistResource;
