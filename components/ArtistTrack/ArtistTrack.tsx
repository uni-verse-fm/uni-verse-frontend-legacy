import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { getTrackById } from "../../api/TrackAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { Messages, urlImage } from "../../common/constants";
import Image from "next/image";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { deletePlaylist } from "../../api/PlaylistAPI";
import useConnect from "../../common/providers/ConnectProvider";
import { notify, NotificationType } from "../Notifications";
import UpdatePlayListForm from "../UpdatePlaylistForm";
import Modal from "../Modal";
import ConfirmDialogDelete from "../ConfirmDialogDelete/ConfirmDialogDelete";

const ArtistTrack = (props) => {
  const { status, data } = useQuery("track", () =>
    getTrackById(props.index).then((res) => {
      console.log("TrackSelected");
      return res.data;
    })
  );

  /* const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const [showUpdatPlayList, setShowUpdatPlayList] = useState(false);
  const handleShowUpdatPlayList = () => setShowUpdatPlayList(true);
  const handleHideUpdatPlayList = () => setShowUpdatPlayList(false);*/
  /*
  const handleConfirmDelete = () => {
    console.log(data._id);
    mutate(data._id);
    handleCloseDialog();
    props.handleClosePlaylistContent();
  };

  const { mutate, isLoading } = useMutation("deletePlaylist", deletePlaylist, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "PlayList deleted";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });
  const [style, setStyle] = useState({display: 'none'});
*/
  return (
    <div>
      <div className="Global bg-grey w-full h-full flex flex-col  ">
        {status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : (
          <>
            {/*
          <h2>Hidden Button in the box. Move mouse in the box</h2>
            <div style={{border: '1px solid gray', width: 300, height: 300, padding: 10, margin: 100}}
                 onMouseEnter={e => {
                     setStyle({display: 'block'});
                 }}
                 onMouseLeave={e => {
                     setStyle({display: 'none'})
                 }}
            >
                <button style={style}>Click</button>
                </div>*/}

            <div className="ml-10 flex flex-row ">
              <div className="ml-5 ">
                <div className="flex flex-row mt-24 mb-1">
                  <h2 className="text-grn ">
                    {JSON.stringify(data)}
                    <FontAwesomeIcon
                      className="cursor-pointer ml-5 hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faPlay}
                    />
                  </h2>
                </div>
                <h2 className="text-gry mb-8">{data._id}</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ArtistTrack;
