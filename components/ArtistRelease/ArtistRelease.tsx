import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock } from "@fortawesome/free-solid-svg-icons";
import { getReleaseById, deleteRelease } from "../../api/ReleaseAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { Messages } from "../../common/constants";
import Image from "next/image";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useMutation } from "react-query";
import useConnect from "../../common/providers/ConnectProvider";
import { notify, NotificationType } from "../Notifications";
import ConfirmDialogDelete from "../ConfirmDialogDelete/ConfirmDialogDelete";
import ShowMoreMenu from "./ShowMoreMenu";
import { me } from "../../api/AuthAPI";
import { Pages } from "../../common/constants";

import router from "next/router";

const ArtistRelease = (props) => {
  const [connect, setConnect] = useConnect();
  const getRelease = useQuery("release", () =>
    getReleaseById(props.index).then((res) => {
      console.log("ReleaseSelected");
      console.log(res.data);
      return res.data;
    })
  );

  const getMe = useQuery("me", () =>
    me().then((res) => {
      console.log("Me");
      console.log(res.data);
      return res.data;
    })
  );

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const handleConfirmDelete = () => {
    console.log(getRelease.data._id);
    mutate(getRelease.data._id);
    handleCloseDialog();
  };

  const { mutate, isLoading } = useMutation("deleteRelease", deleteRelease, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Release deleted";
        notify(message, NotificationType.SUCCESS);
        router.replace(`/${Pages.Home}`);
      }
    },
  });

  return (
    <div>
      <div className="Global bg-grey w-full h-full flex flex-col  ">
        {getRelease.status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : getRelease.status === "error" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : (
          <>
            <div className="ml-10 flex flex-row ">
              <div>
                <Image
                  src={getRelease.data.image || '/Playlist.png'}
                  className="rounded mb-5"
                  width={150}
                  height={150}
                />
              </div>

              <div className="ml-5 ">
                <div className="flex flex-row mt-24 mb-1">
                  <h2 className="text-grn ">
                    {getRelease.data.title}

                    <FontAwesomeIcon
                      className="cursor-pointer ml-5 hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faPlay}
                    />
                  </h2>

                  {getMe.data._id === getRelease.data.author._id ? (
                    <div className="flex flex-row">
                      <h2 className="text-grn">
                        <FontAwesomeIcon
                          className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-rd text-wht"
                          icon={faTrashCan}
                          onClick={handleShowForm}
                        />
                      </h2>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <h2 className="text-gry mb-8">
                  {getRelease.data.author.username}
                </h2>
              </div>
            </div>
            {getRelease.data.tracks.length ? (
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
                  {getRelease.data.tracks.map((item) => (
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
                      <td>23-05-2022</td>
                      <td> 3:28</td>
                      <td>
                        <ShowMoreMenu track={item} />
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
          msg="Delete Release"
        />
      </div>
    </div>
  );
};
export default ArtistRelease;
