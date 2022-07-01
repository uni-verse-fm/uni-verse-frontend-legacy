import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faClock,
  faChevronDown,
  faChevronUp,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { getPlaylistById } from "../../api/PlaylistAPI";
import { useQuery ,useMutation,useQueryClient  } from "react-query";
import Spinner from "../Spinner";
import { Messages } from "../../common/constants";
import Image from "next/image";
import { useState } from "react";
import { deletePlaylist } from "../../api/PlaylistAPI";
import { notify } from "../Notifications";
import UpdatePlayListForm from "../UpdatePlaylistForm";
import ConfirmDialogDelete from "../ConfirmDialogDelete/ConfirmDialogDelete";
import ShowMoreMenu from "./ShowMoreMenu";
import { PlayerContext } from "../../common/contexts/PlayerContext";

import { NotificationType, Track, Types } from "../../common/types";
import { isoDateToDateHour } from "../../utils/dateUtils";

import { isoDateYear } from "../../utils/dateUtils";

import { imageSource } from "../../common/constants";


const Playlist = (props) => {
  const { status, data } = useQuery(`playlist-${props.index}`, () =>
    getPlaylistById(props.index).then((res) => res.data)
  );
  const { dispatch } = useContext(PlayerContext);

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const [showUpdatPlayList, setShowUpdatPlayList] = useState(false);
  const handleShowUpdatPlayList = () => setShowUpdatPlayList(true);
  const handleHideUpdatPlayList = () => setShowUpdatPlayList(false);

  const [ShowMoreInformations, setShowMoreInformations] = useState(false);
  const handleShowMoreInformations = () => setShowMoreInformations(true);
  const handleCloseShowMoreInformations = () => setShowMoreInformations(false);

  const handleConfirmDelete = () => {
    mutate(data._id);
    handleCloseDialog();
    props.handleClosePlaylistContent();
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation("deletePlaylist", deletePlaylist, {
    onError: () => {
      notify("Can not delete playlist", NotificationType.ERROR);
    },
    onSuccess: async (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "PlayList deleted";
        notify(message, NotificationType.SUCCESS);
        await queryClient.fetchQuery("myPlaylists");

      }
    },
    onMutate: async () => {
     // await queryClient.cancelQueries("myPlaylists");

    }
  });

  const onClickTrack = (track: Track) => () => {
    dispatch({
      type: Types.TrackPlay,
      payload: {
        track: track,
      },
    });
  };

  const onClickPlaylist = (playlist) => () => {
    dispatch({
      type: Types.ReleasePlay,
      payload: {
        tracks: playlist.tracks || [],
        trackIndex: 0,
      },
    });
  };

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
            <div className="ml-10 flex flex-row mb-10 ">
              <div>
                <Image
                  src={data.image || "/Playlist.png"}
                  className="rounded mb-5"
                  width={150}
                  height={150}
                  alt="playlist"
                />
              </div>
              <div className="ml-5 items-end mt-2">
                <div className="flex flex-row ">
                  <h2 className="text-grn text-2xl font-bold ">{data.title}</h2>
                  <div className="flex flex-row items-end">
                    <h2 className="text-grn ml-5 items-end">
                      <FontAwesomeIcon
                        className="cursor-pointer text-sm  hover:scale-[1.40] text-wht hover:text-grn"
                        icon={faPlay}
                        onClick={onClickPlaylist(data)}
                      />
                    </h2>
                  </div>

                  {props.enableChange === "true" && (
                    <div className="flex flex-row items-end">
                      <h2 className="text-rd">
                        <FontAwesomeIcon
                          className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-rd text-rd text-sm"
                          icon={faTrashCan}
                          onClick={handleShowForm}
                        />
                      </h2>
                      <h2 className="text-grn">
                        <FontAwesomeIcon
                          className="cursor-pointer ml-5 hover:scale-[1.40] hover:text-gry text-wht text-sm"
                          icon={faPen}
                          onClick={handleShowUpdatPlayList}
                        />
                      </h2>
                    </div>
                  )}
                </div>
                <h2 className="text-gry  ">{data.owner?.username}</h2>

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
                {ShowMoreInformations == true && (
                  <>
                    <h2 className="text-gry text-xs text-wht ">
                      {" "}
                      Created at :{" "}
                    </h2>
                    <h2 className="text-gry text-xs ">
                      {" "}
                      {isoDateToDateHour(data.createdAt)}{" "}
                    </h2>
                    <h2 className="text-gry text-xs text-wht ">
                      Last modified at :
                    </h2>
                    <h2 className="text-gry text-xs ">
                      {isoDateToDateHour(data.createdAt)}
                    </h2>
                  </>
                )}
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
            {data.tracks?.length ? (
              <table className=" ml-10 mr-10 text-gry text-sm rounded-lg bg-gry bg-opacity-50 ">
                <thead>
                  <tr className="text-grn border-b mb-10">
                    <td className="py-3"></td>
                    <td className="py-3 ml-5">Track</td>

                    <td className="py-3">
                      <FontAwesomeIcon
                        className="ml-5 text-grn"
                        icon={faClock}
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {data.tracks.map((track, index: number) => (
                    <tr
                      key={index}
                      className="h-10 cursor-pointer hover:bg-gry hover:bg-opacity-70 "
                    >
                      <td className="flex justify-center items-center mt-5  ">
                        <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                          <FontAwesomeIcon
                            className=" cursor-pointer hover:scale-[1.40] text-grn "
                            icon={faPlay}
                            onClick={onClickTrack(track)}
                          />
                        </div>
                      </td>

                      <td className="cursor-pointer">
                        <div className="flex flex-row">
                          <img
                            src={
                              track?.release?.coverName
                                ? imageSource + track?.release.coverName
                                : "/Playlist.png"
                            }
                            className="rounded-lg m-2"
                            width={50}
                            height={50}
                            alt="Track cover"
                          />
                          <div className="flex flex-col m-2 text-wht text-sm font-bold ">
                            {track.title}
                            <div className="mt-2 text-sedrk text-black text-sm">
                              {`${track.author?.username} - ft.${track.feats
                                ?.map((feat) => ` ${feat.username}`)
                                .join()}`}{" "}
                              {isoDateYear(track.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="text-wht">4:23</td>
                      <td className="text-grn">
                        <ShowMoreMenu
                          track={track}
                          playlist={data}
                          isPage={props.isPage}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          msg="Delete Playlist"
        />
      </div>
    </div>
  );
};
export default Playlist;
