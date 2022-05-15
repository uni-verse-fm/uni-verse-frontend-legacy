import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const PlaylistModalHeader = (props) => {
  return (
    <button
      className="float-left ml-3 mt-1"
      onClick={props.handleHidePlaylistContent}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="bg-blk text-grn" />
    </button>
  );
};
