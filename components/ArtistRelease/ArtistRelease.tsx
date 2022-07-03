import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faTrashCan,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { deleteRelease } from "../../api/ReleaseAPI";
import { imageSource, Messages } from "../../common/constants";
import Image from "next/image";

import { useState } from "react";
import { useMutation } from "react-query";
import { notify } from "../Notifications";
import ConfirmDialogDelete from "../ConfirmDialogDelete";

import router from "next/router";
import { useSession } from "next-auth/react";
import DisplayTracksTable from "../DisplayTracksTable";
import { PlayerContext } from "../../common/contexts/PlayerContext";

import { NotificationType, Pages, Types } from "../../common/types";
import { isoDateToDateHour } from "../../utils/dateUtils";

const ArtistRelease = ({ release }) => {
  const { data: session } = useSession();
  const { dispatch } = useContext(PlayerContext);

  const [ShowMoreInformations, setShowMoreInformations] = useState(false);
  const handleShowMoreInformations = () => setShowMoreInformations(true);
  const handleCloseShowMoreInformations = () => setShowMoreInformations(false);

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const handleConfirmDelete = () => {
    mutate(release._id);
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
    <div className="Global bg-grey w-full h-full flex flex-col  ">
      <div className=" flex flex-row mb-16 ">
        <div>
          <Image
            src={
              release.coverName
                ? imageSource + release.coverName
                : "/Playlist.png"
            }
            className="rounded mb-5"
            width={150}
            height={150}
            alt="Release"
          />
        </div>

        <div className="ml-5 ">
          <div className="flex flex-row mb-1">
            <h2 className="text-grn text-xl font-bold ">
              <FontAwesomeIcon
                className="cursor-pointer hover:scale-[1.40]  text-wht hover:text-grn"
                icon={faPlay}
                onClick={onClickRelease(release)}
              />
            </h2>
            {(session.user as any).id === release.author._id && (
              <div className="flex flex-row">
                <h2 className="text-grn text-xl">
                  <FontAwesomeIcon
                    className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-rd text-rd"
                    icon={faTrashCan}
                    onClick={handleShowForm}
                  />
                </h2>
              </div>
            )}
          </div>

          <div className="flex flex-row ">
            <h2 className="text-grn text-2xl font-bold ">{release.title}</h2>
          </div>
          {release?.author && (
            <h2 className="text-gry ">{release.author.username}</h2>
          )}
          {ShowMoreInformations == false ? (
            <h2 className="text-grn">
              <FontAwesomeIcon
                className="cursor-pointer hover:scale-[1.40] hover:text-grn text-wht"
                icon={faChevronDown}
                onClick={handleShowMoreInformations}
              />
            </h2>

          ) : (
            <h2 className="text-grn">
              <FontAwesomeIcon
                className="cursor-pointer hover:scale-[1.40] hover:text-grn text-grn"
                icon={faChevronUp}
                onClick={handleCloseShowMoreInformations}
              />
            </h2>
          )}

          {release?.description && ShowMoreInformations == true && (
            <>
              <h2 className="text-wht ">{release.description}</h2>
              <h2 className="text-gry text-xs">
                Created at : {isoDateToDateHour(release.createdAt)}
              </h2>
            </>
          )}
        </div>
      </div>

      {release.tracks.length ? (
        <DisplayTracksTable release={release} />
      ) : (
        <div className="flex justify-center items-center mt-10 text-lg">
          <h1 className="text-grn whitespace-nowrap">
            {Messages.EMPTY_TRACKS}
          </h1>
        </div>
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
  );
};
export default ArtistRelease;
