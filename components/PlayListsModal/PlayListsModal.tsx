import React from "react";
import { useState } from "react";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import Modal from "../Modal";
import { PlaylistModalHeader } from "../PlayList/PlaylistModalHeader";
import { PlaylistsModalHeader } from "./PlaylistsModalHeader";
import CreatePlayListForm from "../CreatePlayListForm";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { getUserPlaylists } from "../../api/PlaylistAPI";
import Spinner from "../Spinner";

const PlaylistsModal = ({
  showModal,
  handleCloseModal,
  createPlaylistIndex,
  handleShowCreatePlaylistIndex,
  handleHidecreatePlaylistIndex,
}) => {
  const [playlistIndex, setPlaylistIndex] = useState(null);
  const { data: session } = useSession();

  console.debug ((session?.user as any)?.id);
  const playlistsQuery = useQuery(
    "myPlaylists",
    () =>
    
    getUserPlaylists((session?.user as any)?.id),
    { enabled: Boolean((session?.user as any)?.id)}
  );

  const handleShowPlaylistContent = (index: number) => {
    setPlaylistIndex(index);
  };

  const handleHidePlaylistContent = () => {
    setPlaylistIndex(null);
  };

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
              handleShowCreatePlaylistIndex={handleShowCreatePlaylistIndex}
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
              isPage={false}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            {createPlaylistIndex ? (
              <CreatePlayListForm
                showForm={createPlaylistIndex}
                handleHidecreatePlaylistIndex={handleHidecreatePlaylistIndex}
              />
            ) : playlistsQuery.status === "loading" ? (
              <div className="flex h-full w-full justify-center items-center m-auto">
                <Spinner />
              </div>
            ) : playlistsQuery.status === "error" ? (
              <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-full">
                <h1 className="text-rd whitespace-nowrap">No playlist found</h1>
              </div>
            ) : playlistsQuery.status === "success" ? (
              <Playlists
                handleShowPlaylistContent={handleShowPlaylistContent}
                playlists={
                  (playlistsQuery.status = "success" ? playlistsQuery.data : [])
                }
                modalDisplay="true"
              />
            ) : (
              <div className="flex h-full w-full justify-center items-center m-auto">
              <Spinner />
            </div>
            )}
          </div>
        )}
      </Modal>
    )
  );
};

export default PlaylistsModal;
