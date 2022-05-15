import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Messages } from "../../common/constants";
import { notify } from "../Notifications";

export const PlaylistsModalHeader = () => {
  return (
    <button
      className="float-left ml-1 mt-1 "
      onClick={(_: any) => notify(Messages.NOT_IMPLEMENTED)}
    >
      <h2 className="text-gry hover:text-wht hover:bg-segrn bg-blur-sm rounded-sm gb bg-grn bg-opacity-20 px-2">
        <FontAwesomeIcon className="hover:text-black mr-4" icon={faPlus} />
        Ajouter une playlist
      </h2>
    </button>
  );
};
