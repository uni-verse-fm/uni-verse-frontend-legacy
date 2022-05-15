import React from "react";
import { useState } from "react";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import useConnect from "../../common/providers/ConnectProvider";
import Modal from "../Modal";
import { PlaylistModalHeader } from "../PlayList/PlaylistModalHeader";
import { PlaylistsModalHeader } from "./PlaylistsModalHeader";

const PlaylistsModal = ({ showModal, handleCloseModal }) => {
  {
    /** PlayLists Modal handle*/
  }
  const [playlistIndex, setPlaylistIndex] = useState(null);
  const handleShowPlaylistContent = (index: number) => setPlaylistIndex(index);
  const handleHidePlaylistContent = () => setPlaylistIndex(null);
  const [connect] = useConnect();

  return (
    connect && (
      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        customHeader={
          playlistIndex ? (
            <PlaylistModalHeader
              handleHidePlaylistContent={handleHidePlaylistContent}
            />
          ) : (
            <PlaylistsModalHeader />
          )
        }
      >
          {playlistIndex ? (
            <Playlist index={playlistIndex} />
          ) : (
            <Playlists handleShowPlaylistContent={handleShowPlaylistContent} />
          )}
      </Modal>
    )
  );
};

export default PlaylistsModal;
