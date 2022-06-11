import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { getPlaylistById } from "../../api/PlaylistAPI";
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
import ShowMoreMenu from "./ShowMoreMenu";

const Playlist = (props) => {

  const { status, data } = useQuery("playlist", () =>
    getPlaylistById(props.index).then((res) => {
      console.log("PlayListSelected");
      console.log(data);
      return res.data;
    })
  );

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const [showUpdatPlayList, setShowUpdatPlayList] = useState(false);
  const handleShowUpdatPlayList = () => setShowUpdatPlayList(true);
  const handleHideUpdatPlayList = () => setShowUpdatPlayList(false);

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

  return (
    <div>
      <div className="Global bg-grey w-full h-full flex flex-col">
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
            <div className="ml-10 flex flex-row ">
              <div>
                <Image
                  src={data.image || urlImage}
                  className="rounded mb-5"
                  width={150}
                  height={150}
                />
              </div>

              <div className="ml-5 ">
                <div className="flex flex-row mt-24 mb-1">
                  <h2 className="text-grn ">
                    {data.title}
                    <FontAwesomeIcon
                      className="cursor-pointer ml-5 hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faPlay}
                    />
                  </h2>

                  {(props.enableChange === "true") && (
                    <div className="flex flex-row">
                      <h2 className="text-grn">
                        <FontAwesomeIcon
                          className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-rd text-wht"
                          icon={faTrashCan}
                          onClick={handleShowForm}
                        />
                      </h2>
                      <h2 className="text-grn">
                        <FontAwesomeIcon
                          className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-gry text-wht"
                          icon={faPen}
                          onClick={handleShowUpdatPlayList}
                        />
                      </h2>
                    </div>
                  )}
                </div>
                <h2 className="text-gry mb-8">owner</h2>
              </div>
              <div className="ml-5 ">
                {showUpdatPlayList && data && (
                  <UpdatePlayListForm
                    showForm={showUpdatPlayList}
                    handleHidecreatePlaylistIndex={handleHideUpdatPlayList}
                    dataUpdate={data}
                  />
                )}
              </div>
            </div>
            {data.tracks.length ? (
              <table className=" ml-10 mr-10 text-gry text-sm ">
                <thead>
                  <tr className="text-grn border-b mb-10">
                    <td className="py-3"></td>
                    <td className="py-3">Name</td>
                    <td className="py-3">Creation date</td>
                    <td className="py-3">
                      <FontAwesomeIcon
                        className="ml-5 text-grn"
                        icon={faClock}
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {data.tracks.map((item) => (
                    <tr
                      key={item.name}
                      className="h-10 cursor-pointer hover:text-wht hover:border-b hover:border-t"
                    >
                      <td>
                        <FontAwesomeIcon
                          className=" cursor-pointer hover:scale-[1.40] text-grn"
                          icon={faPlay}
                        />
                      </td>
                      <td>{item}</td>
                      <td>01-06-2022</td>
                      <td>4:23</td>
                      <td>
                        <ShowMoreMenu track= {item} playlist= {data}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center items-center mt-10 text-lg">
                <h1 className="text-grn whitespace-nowrap">
                  {Messages.EMPTY_PLAYLIST}
                </h1>
              </div>
            )}
          </>
        )}
        <ConfirmDialogDelete
          data-backdrop="static"
          data-keyboard="false"
          small={true}
          showModal={showForm}
          handleCloseDialog={handleCloseDialog}
          handleConfirmDelete={handleConfirmDelete}
          msg="Delete Playlist"
        />
      </div>
    </div>
  );
};
export default Playlist;
