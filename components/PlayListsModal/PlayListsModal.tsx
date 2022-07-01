import React from "react";
import { useState } from "react";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import Modal from "../Modal";
import { PlaylistModalHeader } from "../PlayList/PlaylistModalHeader";
import { PlaylistsModalHeader } from "./PlaylistsModalHeader";
import CreatePlayListForm from "../CreatePlayListForm";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deletePlaylist, getUserPlaylists } from "../../api/PlaylistAPI";
import Spinner from "../Spinner";
import { notify } from "../Notifications";
import { NotificationType } from "../../common/types";

const PlaylistsModal = ({
  showModal,
  handleCloseModal,
  createPlaylistIndex,
  handleShowCreatePlaylistIndex,
  handleHidecreatePlaylistIndex,
}) => {
  const queryClient = useQueryClient();
  const [playlistIndex, setPlaylistIndex] = useState(undefined);
  const { data: session } = useSession();

  const playlistsQuery = useQuery(
    "myPlaylists",
    () => getUserPlaylists((session.user as any).id),
    { enabled: Boolean(session?.user) }
  );

  const { mutate } = useMutation("deleteMyPlaylist", deletePlaylist, {
    onError: (error) => {
      notify("Can not delete playlist", NotificationType.ERROR);
    },
    onSuccess: async (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "PlayList deleted";
        notify(message, NotificationType.SUCCESS);
        await playlistsQuery.refetch();
      }
    },
  });

  const onDeletePlaylist = (playlistId: string) => {
    mutate(playlistId);
  }

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
        {playlistsQuery.status === 'success' && playlistIndex ? (
          <div className="w-full h-full">
            <Playlist
              playlist={playlistsQuery.data[playlistIndex]}
              handleClosePlaylistContent={handleHidePlaylistContent}
              handleDelete={onDeletePlaylist}
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
                refetch={playlistsQuery.refetch}
              />
            ) : playlistsQuery.status === "loading" ? (
              <div className="flex h-full w-full justify-center items-center m-auto">
                <Spinner />
              </div>
            ) : playlistsQuery.status === "error" ? (
              <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-full">
                <h1 className="text-rd whitespace-nowrap">No playlist found</h1>
              </div>
            ) :  (
              <Playlists
                handleShowPlaylistContent={handleShowPlaylistContent}
                playlists={playlistsQuery.data}
                modalDisplay="true"
              />
            )}
          </div>
        )}
      </Modal>
    )
  );
};

export default PlaylistsModal;
