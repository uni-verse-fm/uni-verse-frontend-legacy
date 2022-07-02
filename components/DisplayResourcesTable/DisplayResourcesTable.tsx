import { faDownload, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Track, Types } from "../../common/types";
import { isoDateYear } from "../../utils/dateUtils";
import { imageSource } from "../../common/constants";
import router from "next/router";
import { Pages } from "../../common/types";

const DisplayResourcesTable = ({ resources }) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickResource = (resource: Track) => () => {
    {
      /* 
    dispatch({
      type: Types.TrackPlay,
      payload: {
        track: resource,
      },
    });
  */
    }
  };

  const onClickDisplayResource = (resource) => () => {
    {
      /*
        router.push({
      pathname: `/${Pages.Track}`,
      query: { track: JSON.stringify(resource) },
    });
  */
    }
  };

  return (
    <table className="text-wht text-sm mb-5 rounded-lg bg-gry bg-opacity-50  ">
      <thead>
        <tr className="text-grn border-b mb-10 ">
          <td className="py-3 "></td>
          <td className="py-3 ml-24 ">
            <h2 className="ml-3 "> Resource</h2>
          </td>
          <td className="py-3"></td>
        </tr>
      </thead>
      <tbody>
        {resources?.map((resource, index) => (
          <tr
            key={`${resource.title}-${index}`}
            className="h-10 hover:bg-gry hover:bg-opacity-70  "
          >
            <td className="flex justify-center items-center mt-5  ">
              <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                <FontAwesomeIcon
                  className=" cursor-pointer hover:scale-[1.40] text-grn "
                  icon={faPlay}
                  onClick={onClickResource(resource)}
                />
              </div>
            </td>

            <td
              className="cursor-pointer"
              onClick={onClickDisplayResource(resource)}
            >
              <div className="flex flex-row">
                <img
                  src={
                    resource?.release?.coverName
                      ? imageSource + resource?.release.coverName
                      : "/Playlist.png"
                  }
                  className="rounded-lg m-2"
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
            <td className="cursor-pointer">
              <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                <FontAwesomeIcon
                  className=" cursor-pointer hover:scale-[1.40] text-grn "
                  icon={faDownload}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayResourcesTable;
