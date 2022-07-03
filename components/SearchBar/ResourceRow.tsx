import { faComment, faEye, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Resource,  Types } from "../../common/types";
import { imageSource } from "../../common/constants";

interface IResourceRow {
  resource: Resource;
  onClickDisplayResource: () => void;
  disableHover?: boolean;
}

const ResourceRow = ({ resource, onClickDisplayResource, disableHover }: IResourceRow) => {
  const { dispatch } = useContext(PlayerContext);

  {/*const onClickResource = (resource: Resource) => () => {
    dispatch({
      type: Types.ResourcePlay,
      payload: {
        resource: resource,
      },
    });
  };*/}

  return (
    <div
      className={`${
        !disableHover && "hover:text-lg"
      } hover:bg-grn hover:bg-opacity-10 rounded-lg text-md group items-center p-2 font-semibold text-gryf flex items-center justify-between cursor-pointer`}
    >
      <div onClick={onClickDisplayResource} className="flex items-center grow">
        <img
          src={
            resource?.resourcePack?.coverName
              ? imageSource + resource?.resourcePack.coverName
              : "/Playlist.png"
          }
          className="rounded-lg"
          width={80}
          height={80}
          alt="Resource cover"
        />

        <div className="m-3">
          <div className="text-sedrk text-lg">{`${resource.author?.username} - ${
            resource.title}`}
            </div>
          {!!resource.views && (
            <div className="text-grn text-sm">
              {resource.views}
              <FontAwesomeIcon
                className="cursor-pointer mx-2 hover:scale-[1.40] text-grnfa-sm fa-xs"
                icon={faEye}
              />
            </div>
          )}
          {!!resource.comments && (
            <div className="text-grn text-sm">
              {resource.comments}
              <FontAwesomeIcon
                className="cursor-pointer mx-2 hover:scale-[1.40] text-grnfa-sm fa-xs"
                icon={faComment}
              />
            </div>
          )}
        </div>
      </div>
      <FontAwesomeIcon
        className="cursor-pointer mr-5 hover:scale-[1.40] text-grn text-md fa-xl"
        icon={faPlay}
        //onClick={onClickResource(resource)}
      />
    </div>
  );
};

export default ResourceRow;
