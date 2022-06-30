import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faTrashCan , faChevronDown,faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { getReleaseById, deleteRelease } from "../../api/ReleaseAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
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

import {NotificationType, Pages, Types} from "../../common/types";
import { isoDateToDateHour } from "../../utils/dateUtils";

const ArtistRelease = (props) => {
  const { data: session } = useSession();
  const { dispatch } = useContext(PlayerContext);

  const getRelease = useQuery("release", () =>
    getReleaseById(props.index).then((res) => {
      console.log (res.data);
      return (res.data);
    }) 
  );

  const [ShowMoreInformations, setShowMoreInformations] = useState(false);
  const handleShowMoreInformations= () => setShowMoreInformations(true);
  const handleCloseShowMoreInformations = () => setShowMoreInformations(false);

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
            <div className="ml-10 flex flex-row mb-16 ">
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

              <div className="flex flex-row mb-1">
                  <h2 className="text-grn text-xl font-bold ">
                 

                    <FontAwesomeIcon
                      className="cursor-pointer ml-5 hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faPlay}
                      onClick={onClickRelease(getRelease.data)}
                    />
                  </h2>

                  {(session.user as any).id === getRelease.data.author._id && (
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
                  <h2 className="text-grn text-2xl font-bold ">
                    {getRelease.data.title}

                   
                  </h2>

                  
                </div>

              
                {getRelease.data?.author && (
                  <h2 className="text-gry ">
                    {getRelease.data.author.username}
                  </h2>
                )}
                 {(ShowMoreInformations == false) ? (
                  <h2 className="text-grn">
                        <FontAwesomeIcon
                          className="cursor-pointer hover:scale-[1.40] hover:text-rd text-wht"
                          icon={faChevronDown}
                          onClick={handleShowMoreInformations}
                        />
                      </h2>

                    ) : (<h2 className="text-grn">
                      <FontAwesomeIcon
                            className="cursor-pointer hover:scale-[1.40] hover:text-rd text-wht"
                            icon={faChevronUp}
                            onClick={handleCloseShowMoreInformations}
                          />
                            </h2> )}

                 {getRelease.data?.description && (ShowMoreInformations == true) && (
                   <>
                      <h2 className="text-wht ">
                      {getRelease.data.description} 
                    </h2>
                   <h2 className="text-gry text-xs">
                      Created at : {isoDateToDateHour(getRelease.data.createdAt)} 
                    </h2>
                 

                    
                  </>
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
          msg="Delete Release"
        />
      </div>
    </div>
  );
};
export default ArtistRelease;
