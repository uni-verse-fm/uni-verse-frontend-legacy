import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import useConnect from "../../common/providers/ConnectProvider";

const PlaylistsModal = ({ showModal, handleCloseModal }) => {
  {
    /** PlayLists Modal handle*/
  }
  const [playlistIndex, setPlaylistIndex] = useState(null);
  const handleShowPlaylistContent = (index: number) => setPlaylistIndex(index);
  const handleHidePlaylistContent = () => setPlaylistIndex(null);
  const [connected] = useConnect();

  return (
    connected &&
    showModal && (
      <div className="absolute justify-center items-center overflow-x-hidden overflow-y-auto h-2/3 bg-black -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 w-2/3 border-2 border-grn">
        <div className="sticky top-0 bg-black h-9 z-50">
          <button className="float-right mr-3 mt-1" onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faXmark} className="bg-blk text-rd fa-lg" />
          </button>
          {playlistIndex && (
            <button
              className="float-left ml-3 mt-1"
              onClick={handleHidePlaylistContent}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="bg-blk text-grn"
              />
            </button>
          )}
        </div>
        <div className="mt-4">
          {playlistIndex ? (
            <Playlist index={playlistIndex} />
          ) : (
            <Playlists handleShowPlaylistContent={handleShowPlaylistContent} />
          )}
        </div>
      </div>
    )
  );
};

export default PlaylistsModal;
