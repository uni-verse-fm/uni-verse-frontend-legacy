import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { getResourcePackById } from "../../api/ResourcePackAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { imageSource, Messages } from "../../common/constants";
import Image from "next/image";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useMutation } from "react-query";
import { notify } from "../Notifications";
import ConfirmDialogDelete from "../ConfirmDialogDelete";

import router from "next/router";
import { useSession } from "next-auth/react";
import DisplayTracksTable from "../DisplayTracksTable";
import { PlayerContext } from "../../common/contexts/PlayerContext";

import { NotificationType, Pages, Types } from "../../common/types";
import { isoDateYear } from "../../utils/dateUtils";
import { isoDateToDateHour } from "../../utils/dateUtils";

const ResourcePack = (props) => {
  const { data: session } = useSession();
  const { dispatch } = useContext(PlayerContext);

  const getResourcePack = useQuery("resourcePack", () =>
  getResourcePackById(props.index).then((res) => {
    console.log ( "getResourcePackById");
    console.log ( res.data);
    return(res.data);
    }
    )
  );
  const [ShowMoreInformations, setShowMoreInformations] = useState(false);
  const handleShowMoreInformations= () => setShowMoreInformations(true);
  const handleCloseShowMoreInformations = () => setShowMoreInformations(false);
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

    {/*const handleConfirmDelete = () => {
    mutate(getResourcePack.data._id);
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
  });*/}

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
        {getResourcePack.status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : getResourcePack.status === "error" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : (
          <>
            <div className="ml-10 flex flex-row ">
              <div>
                <Image
                  src={
                    getResourcePack.data.coverName
                      ? imageSource + getResourcePack.data.coverName
                      : "/Playlist.png"
                  }
                  className="rounded mb-5"
                  width={150}
                  height={150}
                  alt="ResourcePack"
                />
              </div>

              <div className="ml-5 ">

              <div className="flex flex-row mb-1">
                  <h2 className="text-grn text-xl font-bold ">
                 

                    <FontAwesomeIcon
                      className="cursor-pointer hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faPlay}
                      onClick={onClickRelease(getResourcePack.data)}
                    />
                  </h2>

                  {(session.user as any).id === getResourcePack.data.author && (
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
                    {getResourcePack.data.title}

                   
                  </h2>

                  
                </div>

              
                {getResourcePack.data?.author && (
                  <h2 className="text-gry ">
                    {getResourcePack.data.author}
                  </h2>
                )}
                 {(ShowMoreInformations == false) ? (
                  <h2 className="text-grn">
                        <FontAwesomeIcon
                          className="cursor-pointer hover:scale-[1.40] hover:text-grn text-wht"
                          icon={faChevronDown}
                          onClick={handleShowMoreInformations}
                        />
                      </h2>

                    ) : (<h2 className="text-grn">
                      <FontAwesomeIcon
                            className="cursor-pointer hover:scale-[1.40] hover:text-grn text-grn"
                            icon={faChevronUp}
                            onClick={handleCloseShowMoreInformations}
                          />
                            </h2> )}

                 {getResourcePack.data?.description && (ShowMoreInformations == true) && (
                   <>
                      <h2 className="text-wht ">
                      {getResourcePack.data.description} 
                    </h2>
                   <h2 className="text-gry text-xs">
                      Created at : {isoDateToDateHour(getResourcePack.data.createdAt)} 
                    </h2>
                 

                    
                  </>
                )}      
              
             
              </div>
            </div>
            {getResourcePack.data?.resources.length ? (
             <div className="flex justify-center items-center mt-10 text-lg">
             <h1 className="text-grn whitespace-nowrap">
               {Messages.EMPTY_RESOURCES}
             </h1>
           </div>
            ) : (
              <div className="flex justify-center items-center mt-10 text-lg">
                <h1 className="text-grn whitespace-nowrap">
                  {Messages.EMPTY_RESOURCES}
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
          //handleConfirmDelete={handleConfirmDelete}
          msg="Delete ResourcePack"
        />
      </div>
    </div>
  );
};
export default ResourcePack;
