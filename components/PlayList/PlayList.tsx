import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock } from "@fortawesome/free-solid-svg-icons";

import { getPlaylistById } from "../../api/PlaylistAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { Messages } from "../../common/constants";
import Image from "next/image";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { deletePlaylist } from "../../api/PlaylistAPI";
import { notify } from "../Notifications";
import UpdatePlayListForm from "../UpdatePlaylistForm";
import ConfirmDialogDelete from "../ConfirmDialogDelete/ConfirmDialogDelete";
import ShowMoreMenu from "./ShowMoreMenu";
import { PlayerContext } from "../../common/providers/PlayerProvider";
import { isoDateToDate } from "../../utils/dateUtils";
import { NotificationType, Track, Types } from "../../common/types";

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

  const handleConfirmDelete = () => {
    mutate(data._id);
    handleCloseDialog();
    props.handleClosePlaylistContent();
  };

  const { mutate } = useMutation("deletePlaylist", deletePlaylist, {
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

  const onClickTrack = (track: Track) => () => {
    dispatch({
      type: Types.TrackPlay,
      payload: {
        className: "mt-auto",
        track: track,
      },
    });
  };

  const onClickPlaylist = (playlist) => () => {
    dispatch({
      type: Types.ReleasePlay,
      payload: {
        tracks: playlist.tracks || [],
        className: "mt-auto",
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
            <div className="ml-10 flex flex-row ">
              <div>
                <Image
                  src={data.image || "/Playlist.png"}
                  className="rounded mb-5"
                  width={150}
                  height={150}
                  alt="playlist"
                />
              </div>

              <div className="ml-5 ">
                <div className="flex flex-row mt-24 mb-1">
                  <h2 className="text-grn ">
                    {data.title}
                    <FontAwesomeIcon
                      className="cursor-pointer ml-5 hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faPlay}
                      onClick={onClickPlaylist(data)}
                    />
                  </h2>

                  {props.enableChange === "true" && (
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
                <h2 className="text-gry mb-8">{data.owner?.username}</h2>
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
                  {data.tracks.map((track, index: number) => (
                    <tr
                      key={index}
                      className="h-10 cursor-pointer hover:text-wht hover:border-b hover:border-t"
                    >
                      <td>
                        <FontAwesomeIcon
                          className=" cursor-pointer hover:scale-[1.40] text-grn"
                          icon={faPlay}
                          onClick={onClickTrack(track)}
                        />
                      </td>
                      <td>{track.title}</td>
                      <td>{isoDateToDate(track.createdAt)}</td>
                      <td>4:23</td>
                      <td>
                        <ShowMoreMenu track={track} playlist={data} isPage= {props.isPage} />
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
