import React from "react";
import { useState } from "react";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import useConnect from "../../common/providers/ConnectProvider";
import Modal from "../Modal";
import { PlaylistModalHeader } from "../PlayList/PlaylistModalHeader";
import { PlaylistsModalHeader } from "./PlaylistsModalHeader";
import CreatePlayListForm from "../CreatePlayListForm";

const PlaylistsModal = ({ showModal, handleCloseModal }) => {
  {
    /** PlayLists Modal handle*/
  }
  const [playlistIndex, setPlaylistIndex] = useState(null);
  const handleShowPlaylistContent = (index: number) => 
  
  {
    console.log("index");
    console.log(index);
    setPlaylistIndex(index);
  }
  const handleHidePlaylistContent = () => setPlaylistIndex(null);
  const [connect] = useConnect();

  const [createPlaylistIndex, setCreatePlaylistIndex] = useState(false);
  const handleShowcreatePlaylistIndex = () =>
  {
    console.log("I'm in handleShowcreatePlaylistIndex ");
    console.log("createPlaylistIndex");
    console.log(createPlaylistIndex);
    setCreatePlaylistIndex(true);
    console.log(createPlaylistIndex);
  } 
  const handleHidecreatePlaylistIndex = () => setCreatePlaylistIndex(false);

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
            handleShowcreatePlaylistIndex={handleShowcreatePlaylistIndex}/>
          )
        }
      >
        {playlistIndex ? (
            <Playlist index={playlistIndex} />
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
