import React from "react";
import { useState } from "react";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import Modal from "../Modal";
import { PlaylistModalHeader } from "../PlayList/PlaylistModalHeader";
import { PlaylistsModalHeader } from "./PlaylistsModalHeader";
import CreatePlayListForm from "../CreatePlayListForm";
import { useSession } from "next-auth/react";

const PlaylistsModal = ({
  showModal,
  handleCloseModal,
  createPlaylistIndex,
  handleShowcreatePlaylistIndex,
  handleHidecreatePlaylistIndex,
}) => {

  const [playlistIndex, setPlaylistIndex] = useState(null);

  const handleShowPlaylistContent = (index: number) => {
    console.log("index");
    console.log(index);
    setPlaylistIndex(index);
  };

  const handleHidePlaylistContent = () => {
    console.log(playlistIndex);
    setPlaylistIndex(null);
  };
  const { data: session} = useSession();

  return (
    !!session && (
      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        customHeader={
          playlistIndex ? (
            <PlaylistModalHeader
              handleHidePlaylistContent={handleHidePlaylistContent}
            />
          ) : (
            <PlaylistsModalHeader
              handleShowcreatePlaylistIndex={handleShowcreatePlaylistIndex}
            />
          )
        }
      >
        {playlistIndex ? (
          <div className="w-full h-full">

            <Playlist
              index={playlistIndex}
              handleClosePlaylistContent={handleHidePlaylistContent}
              enableChange="true"
            />
          </div>
        ) : (
          <div className="w-full h-full">
            {createPlaylistIndex ? (
              <CreatePlayListForm
                showForm={createPlaylistIndex}
                handleHidecreatePlaylistIndex={handleHidecreatePlaylistIndex}
              />
            ) : (
              <Playlists
                handleShowPlaylistContent={handleShowPlaylistContent}
              />
            )}
          </div>
        )}
      </Modal>
    )
  );
};

export default PlaylistsModal;
