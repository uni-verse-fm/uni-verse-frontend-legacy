import { faPlay, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { downloadResource } from "../../api/ResourcePackAPI";
import { imageSource } from "../../common/constants";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Resource, Types } from "../../common/types";
import CreateComment from "../CreateComment";

const ArtistResource = ({ resource }) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickResource = (resource: Resource) => () => {
    const preview = {
      fileName: resource.previewFileName,
      title: resource.title,
      author: {
        username: resource?.author?.username,
      },
    };
    dispatch({
      type: Types.PreviewPlay,
      payload: {
        track: preview,
      },
    });
  };

  const onDownloadResource = (resource: Resource) => {
    let destId: string = undefined;
    if (resource.resourcePack?.accessType === "donation") destId = resource.author.stripeAccountId;
    downloadResource(resource.resourcePack?._id, resource.id).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "universe.mp3");
      document.body.appendChild(link);
      link.click();
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
                  resource?.resourcepack?.coverName
                    ? imageSource + resource?.resourcepack.coverName
                    : "/Playlist.png"
                }
                className="rounded-lg object-cover w-56 h-56"
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
                <div className="text-md font-bold text-grn mx-2">{`(ResourcesPack: ${resource?.resourcePack?.title})`}</div>
              </div>

              {resource.previewFileName && (
                <div className="ml-2 bg-opacity-30 bg-gry rounded-full w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                  <FontAwesomeIcon
                    className="cursor-pointer hover:scale-[1.40] hover:text-grn text-wht"
                    icon={faPlay}
                    onClick={onClickResource(resource)}
                  />
                </div>
              )}

              {resource.download && (
                <div className="ml-2 bg-opacity-30 bg-gry rounded-full w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                  <FontAwesomeIcon
                    className="cursor-pointer hover:scale-[1.40] hover:text-grn text-wht"
                    icon={faDownload}
                    onClick={() => onDownloadResource(resource)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <CreateComment idContent={resource?.id} typeOfContent="Resource" />
      </div>
    </div>
  );
};
export default ArtistResource;
