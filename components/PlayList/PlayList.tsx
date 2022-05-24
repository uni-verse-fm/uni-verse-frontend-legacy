import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock } from "@fortawesome/free-solid-svg-icons";
import { getPlaylistById } from "../../api/PlaylistAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { Messages, urlImage } from "../../common/constants";
import Image from "next/image";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";

import ConfirmDialog from "../../components/ConfirmDialog";
import { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { deletePlaylist } from "../../api/PlaylistAPI";
import useConnect from "../../common/providers/ConnectProvider";
import { notify, NotificationType } from "../Notifications";
import UpdatePlayListForm from "../UpdatePlaylistForm";

const Playlist = ({ index, handleClosePlaylistContent }) => {
  const { status, data } = useQuery("playlist", () =>
    getPlaylistById(index).then((res) => {
      console.log("PlayListSelected");
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
    handleClosePlaylistContent();
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

  return (
    <div>
      <div className="Global bg-grey w-full h-full flex flex-col  ">
        <ConfirmDialog
          showForm={showForm}
          handleDialogClose={handleCloseDialog}
          msg="Delete Playlist"
          handleConfirm={handleConfirmDelete}
        />
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
                <h2 className="text-grn mt-24 mb-1">
                  {data.title}
                  <FontAwesomeIcon
                    className="cursor-pointer ml-5 hover:scale-[1.40]  text-wht hover:text-grn"
                    icon={faPlay}
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-rd text-wht"
                    icon={faTrashCan}
                    onClick={handleShowForm}
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-gry text-wht"
                    icon={faPen}
                    onClick={handleShowUpdatPlayList}
                  />
                </h2>
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
            {data.length ? (
            <table className=" ml-10 mr-10 text-gry text-sm ">
              <thead>
                <tr className="text-grn border-b mb-10">
                  <td className="py-3"></td>
                  <td className="py-3">Name</td>
                  <td className="py-3">Album</td>
                  <td className="py-3">Creation date</td>
                  <td className="py-3">
                    <FontAwesomeIcon className="ml-5 text-grn" icon={faClock} />
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
                    <td>{item.name}</td>
                    <td>Album 1</td>
                    <td>{item.createdate}</td>
                    <td>{item.duration}</td>
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
      </div>
    </div>
  );
};
export default Playlist;
