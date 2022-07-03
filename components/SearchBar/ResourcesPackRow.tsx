import { faEye, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { imageSource } from "../../common/constants";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { Types } from "../../common/types";

interface IResourcesPack {
  resourcesPack: any;
  onClickDisplayResourcesPack: () => void;
  disableHover?: boolean;
}

const ResourcesPackRow = ({
  resourcesPack,
  onClickDisplayResourcesPack,
  disableHover,
}: IResourcesPack) => {
  const { dispatch } = useContext(PlayerContext);

  const onClickResourcesPack = (resource) => () => {
    {
      /** dispatch({
      type: Types.ResourcesPackPlay,
      payload: {
        resources: resourcesPack.resources || [],
        resourceIndex: 0,
      },
    });*/
    }
  };

  return (
    <div
      className={`${
        !disableHover && "hover:text-lg"
      } hover:bg-grn hover:bg-opacity-10 rounded-lg text-md group items-center p-2 font-semibold text-gryf flex items-center justify-between cursor-pointer`}
    >
      <div
        onClick={onClickDisplayResourcesPack}
        className="flex items-center grow"
      >
        <img
          src={
            resourcesPack.coverName
              ? imageSource + resourcesPack.coverName
              : "/profile.jpg"
          }
          className="rounded-lg"
          width={80}
          height={80}
          alt="resourcesPack"
        />
        <div className="m-3">
          <div className="text-sedrk text-md">
            {`${resourcesPack.title} by ${resourcesPack.author?.username}`}
          </div>

          {!!resourcesPack.views && (
            <div className="text-grn text-sm">
              {resourcesPack.views / (resourcesPack.resources?.length || 1)}
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
        onClick={onClickResourcesPack(resourcesPack)}
      />
    </div>
  );
};

export default ResourcesPackRow;
