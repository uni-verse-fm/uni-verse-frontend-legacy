import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import useConnect from "../../common/providers/ConnectProvider";
import { Messages } from "../../common/constants";
import { notify } from "../Notifications";

const PlaylistsModal = ({ showModal, handleCloseModal }) => {
  {
    /** PlayLists Modal handle*/
  }
  const [playlistIndex, setPlaylistIndex] = useState(null);
  const handleShowPlaylistContent = (index: number) => setPlaylistIndex(index);
  const handleHidePlaylistContent = () => setPlaylistIndex(null);
  const [connect] = useConnect();

  return (
    connect &&
    showModal && (
      <div className="absolute justify-center items-center overflow-x-hidden overflow-y-auto h-2/3 bg-black -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 w-2/3 border-2 border-grn rounded-md">
        <div className="sticky top-0 bg-black h-9 z-50">
          <button className="float-right mr-3 mt-1" onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faXmark} className="bg-blk text-rd fa-lg" />
          </button>
          {playlistIndex ? (
            <button
              className="float-left ml-3 mt-1"
              onClick={handleHidePlaylistContent}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="bg-blk text-grn"
              />
            </button>
          ) : (
            <button
              className="float-left ml-1 mt-1 "
              onClick={(_: any) => notify(Messages.NOT_IMPLEMENTED)}
            >
              <h2 className="text-gry hover:text-wht hover:bg-segrn bg-blur-sm rounded-sm gb bg-grn bg-opacity-20 px-2">
                <FontAwesomeIcon
                  className="hover:text-black mr-4"
                  icon={faPlus}
                />
                Ajouter une playList
              </h2>
            </button>
          )}
        </div>
        <div className="p-4">
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
