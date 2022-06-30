import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { getReleaseById, deleteRelease } from "../../api/ReleaseAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { imageSource, Messages } from "../../common/constants";
import Image from "next/image";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useMutation } from "react-query";
import { notify } from "../Notifications";
import ConfirmDialogDelete from "../ConfirmDialogDelete/ConfirmDialogDelete";

import router from "next/router";
import { useSession } from "next-auth/react";
import DisplayTracksTable from "../DisplayTracksTable";
import { PlayerContext } from "../../common/contexts/PlayerContext";

import { NotificationType, Pages, Types } from "../../common/types";

const ResourcePack = (props) => {
  const { data: session } = useSession();
  const { dispatch } = useContext(PlayerContext);

  const getRelease = useQuery("release", () =>
    getReleaseById(props.index).then((res) => res.data)
  );

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const handleConfirmDelete = () => {
    mutate(getRelease.data._id);
    handleCloseDialog();
  };

  const { mutate, isLoading } = useMutation("deleteRelease", deleteRelease, {
    onError: () => {
      notify("Can not delete release", NotificationType.ERROR);
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

  const onClickRelease = (release) => () => {
    dispatch({
      type: Types.ReleasePlay,
      payload: {
        tracks: release.tracks || [],
        trackIndex: 0,
      },
    });
  };

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
                  src={
                    getRelease.data.coverName
                      ? imageSource + getRelease.data.coverName
                      : "/Playlist.png"
                  }
                  className="rounded mb-5"
                  width={150}
                  height={150}
                  alt="Release"
                />
              </div>

              <div className="ml-5 ">
                <div className="flex flex-row mt-24 mb-1">
                  <h2 className="text-grn ">
                    {getRelease.data.title}

                    <FontAwesomeIcon
                      className="cursor-pointer ml-5 hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faPlay}
                      onClick={onClickRelease(getRelease.data)}
                    />
                  </h2>

                  {(session.user as any).id === getRelease.data.author && (
                    <div className="flex flex-row">
                      <h2 className="text-grn">
                        <FontAwesomeIcon
                          className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-rd text-wht"
                          icon={faTrashCan}
                          onClick={handleShowForm}
                        />
                      </h2>
                    </div>
                  )}
                </div>
                {getRelease.data?.author && (
                  <h2 className="text-gry mb-8">
                    {getRelease.data.author.username}
                  </h2>
                )}
              </div>
            </div>
            {getRelease.data.tracks.length ? (
              <DisplayTracksTable tracks={getRelease.data.tracks} />
            ) : (
              <div className="flex justify-center items-center mt-10 text-lg">
                <h1 className="text-grn whitespace-nowrap">
                  {Messages.EMPTY_TRACKS}
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
          msg="Delete ResourcePack"
        />
      </div>
    </div>
  );
};
export default ResourcePack;
