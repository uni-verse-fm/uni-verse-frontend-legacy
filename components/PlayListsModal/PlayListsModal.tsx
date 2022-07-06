import React, { useEffect } from "react";
import { useState } from "react";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import Modal from "../Modal";
import { PlaylistModalHeader } from "../PlayList/PlaylistModalHeader";
import { PlaylistsModalHeader } from "./PlaylistsModalHeader";
import CreatePlayListForm from "../CreatePlayListForm";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
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
  const [playlistIndex, setPlaylistIndex] = useState(undefined);
  const [playlist, setPlaylist] = useState(undefined);

  const { data: session } = useSession();

  const playlistsQuery = useQuery(
    "my-playlists",
    () => getUserPlaylists((session?.user as any)?.id).then((res) => res.data),
    { enabled: Boolean((session?.user as any)?.id && showModal) }
  );

  const { mutate, isSuccess } = useMutation(
    "deleteMyPlaylist",
    deletePlaylist,
    {
      onError: () => {
        notify("Can not delete playlist", NotificationType.ERROR);
      },
      onSuccess: async (res) => {
        if (res.status !== 200) {
          notify(res.data.message, NotificationType.ERROR);
        } else {
          const message = "Playlist deleted";
          notify(message, NotificationType.SUCCESS);
        }
        await playlistsQuery.refetch();
      },
    }
  );

  useEffect(() => {
    playlistsQuery.data && setPlaylist(playlistsQuery.data[playlistIndex]);
  }, [playlistsQuery.data, playlistIndex, isSuccess]);

  const refreshPlaylist = () => {
    playlistsQuery.refetch();
  };

  const onDeletePlaylist = (playlistId: string) => {
    mutate(playlistId);
  };

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
          Number.isInteger(playlistIndex) ? (
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
        {playlistsQuery.status === "success" &&
        Number.isInteger(playlistIndex) ? (
          <div className="w-full h-full">
            <Playlist
              playlist={playlist}
              handleClosePlaylistContent={handleHidePlaylistContent}
              handleDelete={onDeletePlaylist}
              enableChange="true"
              isPage={false}
              refreshPlaylist={refreshPlaylist}
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
            ) : (
              <Playlists
                handleShowPlaylistContent={handleShowPlaylistContent}
                playlists={playlistsQuery.data}
                modalDisplay={true}
              />
            )}
          </div>
        )}
      </Modal>
    )
  );
};

export default PlaylistsModal;
