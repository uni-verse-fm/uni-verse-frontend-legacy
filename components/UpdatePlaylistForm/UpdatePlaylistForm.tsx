import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Playlist from "../PlayList";
import Playlists from "../PLaylists";
import useConnect from "../../common/providers/ConnectProvider";
import { Messages } from "../../common/constants";
import { notify, NotificationType } from "../Notifications";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { createPlaylist } from "../../api/PlaylistAPI";
import { updatePlaylist } from "../../api/PlaylistAPI";
import { Console } from "console";

export interface IPlaylist {
  title: string;
}

export interface IUpdatePayload {
  id: string;
  data: object;
}

export interface IUpdatePlaylistdata {
  title: string;
}

const UpdatePlayListForm = ({
  showForm,
  handleHidecreatePlaylistIndex,
  dataUpdate,
}) => {
  {
    /** PlayLists Modal handle*/
  }
  const [connect] = useConnect();

  const { mutate, isLoading } = useMutation("updatePlaylist", updatePlaylist, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        handleHidecreatePlaylistIndex();
        const message = "PlayList updated successfully";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });

  {
    /**  Si connection et showForm  Affichage  */
  }

  return (
    showForm && (
      <div className="flex flex-col justify-center items-start">
        <div>
          <h1 className="text-xl font-bold not-italic text-grn  mb-3 ml-14">
            Edit playList
          </h1>
        </div>
        <Formik
          initialValues={{
            title: dataUpdate.title,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .max(15, Messages.TITLE)
              .min(5, Messages.TITLE)
              .required(Messages.REQUIRED),
          })}
          onSubmit={(value) => {
            let dataToUpdate = dataUpdate;
            dataToUpdate.title = value.title;
            console.log("New Data ");
            console.log(dataToUpdate);

            let dataFormUpdate: IUpdatePlaylistdata = {
              title: dataToUpdate.title,
            };

            let dataForm: IUpdatePayload = {
              id: dataUpdate._id,
              data: value,
            };

            console.log("dataForm");
            console.log(dataForm);
            console.log("dataForm.id");
            console.log(dataForm.id);
            console.log("dataForm.data");
            console.log(dataForm.data);
            mutate(dataForm);
          }}
          render={({ values, errors, handleChange, handleBlur }) => {
            return (
              <div className="bg-blk flex ml-6  w-full h-auto mr-10 mb-12 justify-center items-center  ">
                <Form className="flex flex-col justify-center items-center rounded bg-wht w-auto h-auto">
                  <div className="flex flex-col items-start p-6 pb-2 pt-4 w-72 h-auto">
                    <label className="mb-2 text-blck text-sm">
                      Playlist title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Enter a title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="text-sm bg-drk w-full h-full text-wht pl-2 rounded placeholder-gry h-8"
                      value={values.title}
                    />
                  </div>

                  <div className="flex flex-row items-start w-72 h-auto">
                    <input
                      className="mb-4 ml-6 rounded bg-grn font-normal cursor-pointer h-7 w-32 text-wht"
                      type="submit"
                      value="Save"
                    ></input>
                    <button
                      className="mb-4 ml-4 mr-6 rounded-sm bg-grn font-normal cursor-pointer h-7 w-32 text-wht"
                      onClick={handleHidecreatePlaylistIndex}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </div>
            );
          }}
        />
      </div>
    )
  );
};

export default UpdatePlayListForm;
