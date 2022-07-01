import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock,faTrashCan,faPen } from "@fortawesome/free-solid-svg-icons";

import { Messages } from "../../common/constants";
import Image from "next/image";
import { useState } from "react";
import { deletePlaylist } from "../../api/PlaylistAPI";
import { notify } from "../Notifications";
import UpdatePlayListForm from "../UpdatePlaylistForm";
import ConfirmDialogDelete from "../ConfirmDialogDelete/ConfirmDialogDelete";
import ShowMoreMenu from "./ShowMoreMenu";
import { PlayerContext } from "../../common/contexts/PlayerContext";
import { isoDateToDate } from "../../utils/dateUtils";
import { Track, Types } from "../../common/types";

const Playlist = ({
  playlist,
  handleClosePlaylistContent,
  handleDelete,
  enableChange,
  isPage,
}) => {
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
    handleDelete(playlist?._id);
    handleCloseDialog();
    handleClosePlaylistContent();
  };

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
        <div className="ml-10 flex flex-row ">
          <div>
            <Image
              src={"/Playlist.png"}
              className="rounded mb-5"
              width={150}
              height={150}
              alt="playlist"
            />
          </div>

          <div className="ml-5 ">
            <div className="flex flex-row mt-24 mb-1">
              <h2 className="text-grn ">
                {playlist?.title}
                <FontAwesomeIcon
                  className="cursor-pointer ml-5 hover:scale-[1.40] text-wht hover:text-grn"
                  icon={faPlay}
                  onClick={onClickPlaylist(playlist)}
                />
              </h2>

              {enableChange === "true" && (
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
            <h2 className="text-gry mb-8">{playlist?.owner?.username}</h2>
          </div>
          <div className="ml-5 ">
            {showUpdatPlayList && playlist && (
              <UpdatePlayListForm
                showForm={showUpdatPlayList}
                handleHidecreatePlaylistIndex={handleHideUpdatPlayList}
                dataUpdate={playlist}
              />
            )}
          </div>
        </div>
        {playlist?.tracks?.length > 0 ? (
          <table className=" ml-10 mr-10 text-gry text-sm ">
            <thead>
              <tr className="text-grn border-b mb-10">
                <td className="py-3"></td>
                <td className="py-3">Name</td>
                <td className="py-3">Artist</td>
                <td className="py-3">
                  <FontAwesomeIcon className="ml-5 text-grn" icon={faClock} />
                </td>
              </tr>
            </thead>
            <tbody>
              {playlist?.tracks.map((track, index: number) => (
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
                  <td>
                    {track.author.username} {isoDateToDate(track.createdAt)}
                  </td>
                  <td>4:23</td>
                  <td>
                    <ShowMoreMenu
                      track={track}
                      playlist={playlist}
                      isPage={isPage}
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
