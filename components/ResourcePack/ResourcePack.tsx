import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { getResourcePackById } from "../../api/ResourcePackAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { imageSource, Messages } from "../../common/constants";
import Image from "next/image";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import ConfirmDialogDelete from "../ConfirmDialogDelete";

import { useSession } from "next-auth/react";
import { PlayerContext } from "../../common/contexts/PlayerContext";

import { Types } from "../../common/types";
import { isoDateToDateHour } from "../../utils/dateUtils";
import DisplayResourcesTable from "../DisplayResourcesTable";

const ResourcePack = (props) => {
  const { data: session } = useSession();
  const { dispatch } = useContext(PlayerContext);

  const getResourcePack = useQuery("resourcePack", () =>
    getResourcePackById(props.index).then((res) => {
      console.log("getResourcePackById");
      console.log(res.data);
      return res.data;
    })
  );
  const [ShowMoreInformations, setShowMoreInformations] = useState(false);
  const handleShowMoreInformations = () => {
    setShowMoreInformations(true);
    console.log("ressourcesPack");
  };
  const handleCloseShowMoreInformations = () => setShowMoreInformations(false);
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  {
    /* const onClickResourcePack = (resourcePack) => () => {
    dispatch({
      type: Types.resourcePackPlay,
      payload: {
        tracks: resourcePack.resources || [],
        resourceIndex: 0,
      },
    });
  };
  */
  }

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
            <div className="flex flex-row mb-10">
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
                    />
                  </h2>

                  {(session.user as any).id === getResourcePack.data.author && (
                    <div className="flex flex-row">
                      <h2 className="text-grn text-xl">
                        <FontAwesomeIcon
                          className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-rd text-rd"
                          icon={faTrashCan}
                          //onClick={handleShowForm}
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
                    {getResourcePack.data.author.username}
                  </h2>
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

                {getResourcePack.data?.description &&
                  ShowMoreInformations == true && (
                    <>
                      <h2 className="text-wht ">
                        {getResourcePack.data.description}
                      </h2>
                      <h2 className="text-gry text-xs">
                        Created at :{" "}
                        {isoDateToDateHour(getResourcePack.data.createdAt)}
                      </h2>
                    </>
                  )}
              </div>
            </div>
            {getResourcePack.data?.resources.length ? (
              <DisplayResourcesTable
                resources={getResourcePack.data.resources}
              />
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
