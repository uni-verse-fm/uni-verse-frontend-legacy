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
import { notify, NotificationType } from "../Notifications";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { createPlaylist } from "../../api/PlaylistAPI";
import CreatePlayListForm from "../CreatePlayListForm";

export interface IPlaylist {
  title: string;
}

const PlaylistsModal = ({ showModal, handleCloseModal }) => {
  {
    /** PlayLists Modal handle*/
  }
  const [playlistIndex, setPlaylistIndex] = useState(null);
  const handleShowPlaylistContent = (index: number) => {
    console.log("ID_PlayList");
    console.log(index);
    console.log("playlistIndex");
    console.log(playlistIndex);
    setPlaylistIndex(index);
    console.log("playlistIndex");
    console.log(playlistIndex);
  };
  const handleHidePlaylistContent = () => setPlaylistIndex(null);

  const [createPlaylistIndex, setCreatePlaylistIndex] = useState(false);
  const handleShowcreatePlaylistIndex = () => setCreatePlaylistIndex(true);
  const handleHidecreatePlaylistIndex = () => setCreatePlaylistIndex(false);

  const [connect] = useConnect();

  const { mutate, isLoading } = useMutation("createPlaylist", createPlaylist, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        setCreatePlaylistIndex(false);
        console.log(createPlaylistIndex);
        const message = "PlayList created successfully";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });

  {
    /**  Si connection et Show modal Affichage de la liste des playlists  */
  }
  return (
    connect &&
    showModal && (
      <div className="absolute justify-center items-center overflow-x-hidden overflow-y-auto h-2/3 bg-black -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 w-2/3 border border-grn">
        <div className="sticky top-0 bg-black h-9 z-50">
          <button className="float-right mr-3" onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faXmark} className="bg-blk text-rd fa-lg" />
          </button>

          {/** if playlistIndex Header modal Affichage de PlayList Contents */}
          {/** Else Affichage de Playlists */}
          {playlistIndex ? (
            <button
              className="float-left ml-3"
              onClick={handleHidePlaylistContent}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="bg-blk text-grn"
              />
            </button>
          ) : (
            <button
              className="float-left m-10"
              onClick={handleShowcreatePlaylistIndex}
            >
              <h2 className=" text-gry hover:text-wht hover:bg-segrn bg-blur-sm rounded-sm gb bg-grn bg-opacity-20 px-2">
                <FontAwesomeIcon
                  className="hover:text-black mr-4"
                  icon={faPlus}
                />
                Create a playList
              </h2>
            </button>
          )}
        </div>
        <div className="p-4">
          {/** If playlistIndex Affichage de  PlayList content */}
          {/** Else Affichage de Playlists */}
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
        </div>
      </div>
    )
  );
};

export default PlaylistsModal;
