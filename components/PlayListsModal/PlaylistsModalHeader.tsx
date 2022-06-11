import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const PlaylistsModalHeader = ({ handleShowcreatePlaylistIndex }) => {
  return (
    <button className="ml-5 mt-8" onClick={handleShowcreatePlaylistIndex}>
      <h2 className="text-gry hover:text-wht hover:bg-segrn bg-blur-sm rounded-sm gb bg-grn bg-opacity-20 px-2  ">
        <FontAwesomeIcon className="hover:text-black mr-4" icon={faPlus} />
        Add a playlist
      </h2>
    </button>
  );
};
