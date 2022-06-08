import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock } from "@fortawesome/free-solid-svg-icons";
import { getReleaseById } from "../../api/ReleaseAPI";
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

const ArtistRelease = (props) => {

  let tracks = [
    { name: " track N°1", Album: " Album 1", createdate: "22-10-2022", duration: "2:33" },
    { name: " track N°2", Album: " Album 2", createdate: "22-10-2022", duration: "2:33" },
    { name: " track N°2", Album: " Album 3", createdate: "22-10-2022", duration: "2:33"  },
    { name: " track N°3", Album: " Album 4", createdate: "22-10-2022", duration: "2:33"  },
    { name: " track N°4", Album: " Album 15", createdate: "22-10-2022", duration: "2:33"  },
    { name: " track N°5", Album: " Album 7", createdate: "22-10-2022", duration: "2:33"  }
  ];

  const { status, data } = useQuery("release", () =>
      getReleaseById(props.index).then((res) => {
      console.log("ReleaseSelected");
      return res.data;
    })
  );

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const [showUpdatPlayList, setShowUpdatPlayList] = useState(false);
  const handleShowUpdatPlayList = () => setShowUpdatPlayList(true);
  const handleHideUpdatPlayList = () => setShowUpdatPlayList(false);

  /*const handleConfirmDelete = () => {
    console.log(data._id);
    mutate(data._id);
    handleCloseDialog();
    props.handleClosePlaylistContent();
  };*/

 /* const { mutate, isLoading } = useMutation("deletePlaylist", deletePlaylist, {
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
  });*/

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

                  {props.enableChange === "true" ? (
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
                  ) : (
                    <div></div>
                  )}
                </div>
                <h2 className="text-gry mb-8">{data._id}</h2>
              </div>

              <div className="ml-5 ">
                {showUpdatPlayList && data ? (
                  <UpdatePlayListForm
                    showForm={showUpdatPlayList}
                    handleHidecreatePlaylistIndex={handleHideUpdatPlayList}
                    dataUpdate={data}
                  />
                ) : (
                  <div></div>
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
                      <td>{item.title}</td>
                      <td>{item._id}</td>
                      <td>{item.duration}</td>
                      <td>
                        <ShowMoreMenu track= {item}
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

{/*
        <ConfirmDialogDelete
          data-backdrop="static"
          data-keyboard="false"
          small={true}
          showModal={showForm}
          handleCloseDialog={handleCloseDialog}
          handleConfirmDelete={handleConfirmDelete}
          msg="Delete Playlist"
        />
        */
}
      </div>
    </div>
  );
};
export default ArtistRelease;
