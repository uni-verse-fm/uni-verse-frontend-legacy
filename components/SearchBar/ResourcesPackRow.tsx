import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imageSource } from "../../common/constants";

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
          className="rounded-lg m-2 w-20 h-20"
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
    </div>
  );
};

export default ResourcesPackRow;
