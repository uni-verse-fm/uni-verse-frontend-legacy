import React from "react";
import { useState } from "react";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import useConnect from "../../common/providers/ConnectProvider";
import Modal from "../Modal";
import { PlaylistModalHeader } from "../PlayList/PlaylistModalHeader";
import { PlaylistsModalHeader } from "./PlaylistsModalHeader";
import CreatePlayListForm from "../CreatePlayListForm";
import { IPlaylist } from "../CreatePlayListForm/CreatePlayListForm";
import UpdatePlayListForm from "../UpdatePlaylistForm";

const PlaylistsModal = ({
  showModal,
  handleCloseModal,
  createPlaylistIndex,
  handleShowcreatePlaylistIndex,
  handleHidecreatePlaylistIndex,
}) => {
  {
    /** PlayLists Modal handle*/
  }

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
            <PlaylistsModalHeader
              handleShowcreatePlaylistIndex={handleShowcreatePlaylistIndex}
            />
          )
        }
      >
        {playlistIndex ? (
          <div className="w-full h-full">
            {/** If createPlaylistIndex (update) Affichage de update PlayList */}
            {/** Else Affichage de PlaylistContent */}
            <Playlist
              index={playlistIndex}
              handleClosePlaylistContent={handleHidePlaylistContent}
              enableChange="true"
            />
            {/** )} */}
          </div>
        ) : (
          <div className="w-full h-full">
            {/** If createPlaylistIndex Affichage de create PlayList */}
            {/** Else Affichage de Playlists */}
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
