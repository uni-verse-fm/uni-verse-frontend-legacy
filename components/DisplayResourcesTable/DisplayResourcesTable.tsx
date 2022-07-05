import { faDownload, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Resource, Types } from "../../common/types";
import { isoDateYear } from "../../utils/dateUtils";
import { imageSource } from "../../common/constants";
import router from "next/router";
import { Pages } from "../../common/types";
import { downloadResource } from "../../api/ResourcePackAPI";

const DisplayResourcesTable = ({ resourcePack, download }) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickResource = (resource: Resource) => () => {
    const preview = {
      fileName: resource.previewFileName,
      title: resource.title,
      author: {
        username: resourcePack.author.username,
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
    if (resourcePack.accessType === "donation") destId = resourcePack._id;
    downloadResource(resourcePack._id, resource.id).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "universe.mp3");
      document.body.appendChild(link);
      link.click();
    });
  };

  const onClickDisplayResource = (resource) => () => {
    const resourcespack = {
      coverName: resourcePack.coverName,
      title: resourcePack.title,
      _id: resourcePack._id,
      id: resourcePack.id,
    };

    const RessourceToDisplay = {
      title: resource.title,
      fileName: resource.fileName,
      previewFileName: resource.previewFileName,
      author: resource.author,
      resourcePack: resourcespack,
      comments: resource.comments,
      download,

      id: resource.id,
      _id: resource._id,
    };

    router.push({
      pathname: `/${Pages.Resource}`,
      query: { resource: JSON.stringify(RessourceToDisplay) },
    });
  };

  return (
    <table className="text-wht text-sm mb-5 rounded-lg bg-gry bg-opacity-50  ">
      <thead>
        <tr className="text-grn border-b mb-10 ">
          <td className="py-3 "></td>
          <td className="py-3 ml-24 ">
            <h2 className="ml-3">Download</h2>
          </td>
          <td className="py-3"></td>
        </tr>
      </thead>
      <tbody>
        {resourcePack.resources?.map((resource, index) => (
          <tr
            key={`${resource.title}-${index}`}
            className="h-10 hover:bg-gry hover:bg-opacity-70  "
          >
            {resource.previewFileName && (
              <td className="flex justify-center items-center mt-5  ">
                <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                  <FontAwesomeIcon
                    className=" cursor-pointer hover:scale-[1.40] text-grn "
                    icon={faPlay}
                    onClick={onClickResource(resource)}
                  />
                </div>
              </td>
            )}

            <td
              className="cursor-pointer"
              onClick={onClickDisplayResource(resource)}
            >
              <div className="flex flex-row">
                <img
                  src={
                    resource?.resourcePack?.coverName
                      ? imageSource + resource?.resourcePack.coverName
                      : "/Playlist.png"
                  }
                  className="rounded-lg object-cover m-2"
                  width={50}
                  height={50}
                  alt="Track cover"
                />
                <div className="flex flex-col m-2 text-wht text-sm font-bold ">
                  {resource.title}

                  <div className="mt-2 text-gryf text-sm">
                    {resource.author?.username}{" "}
                    {isoDateYear(resource.createdAt)}
                  </div>
                </div>
              </div>
            </td>
            {download && (
              <td className="cursor-pointer">
                <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                  <FontAwesomeIcon
                    className=" cursor-pointer hover:scale-[1.40] text-grn "
                    icon={faDownload}
                    onClick={() => onDownloadResource(resource)}
                  />
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayResourcesTable;
