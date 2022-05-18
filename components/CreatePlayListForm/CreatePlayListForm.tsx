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

export interface IPlaylist {
  title: string;
}

const CreatePlayListForm = ({ showForm, handleHidecreatePlaylistIndex }) => {
  {
    /** PlayLists Modal handle*/
  }
  const [connect] = useConnect();

  const { mutate, isLoading } = useMutation("createPlaylist", createPlaylist, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        handleHidecreatePlaylistIndex();
        const message = "PlayList created successfully";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });

  {
    /**  Si connection et showForm  Affichage  */
  }

  return (
    showForm && (
      <Formik
        initialValues={{
          title: "",
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .max(15, Messages.TITLE)
            .min(5, Messages.TITLE)
            .required(Messages.REQUIRED),
        })}
        onSubmit={(value) => {
          mutate(value);
        }}
        render={({ values, errors, handleChange, handleBlur }) => {
          return (
            <div className="bg-black flex ml-6  w-full h-auto mr-10 mb-12 ">
              <Form className="flex flex-col justify-center rounded-sm bg-wht w-auto h-auto">
                <div className="flex flex-col items-start p-6 w-72 h-auto">
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
                    className="text-sm bg-black w-full h-full text-wht pl-2 rounded-sm placeholder-gry"
                    value={values.title}
                  />
                  {errors.title && (
                    <div className="text-rd">{errors.title}</div>
                  )}
                </div>

                <div className="flex flex-row items-start w-72 h-auto">
                  <input
                    className="mb-4 ml-6 rounded-sm bg-grn font-normal cursor-pointer h-6 w-32 text-wht"
                    type="submit"
                    value="Save"
                  ></input>
                  <button
                    className="mb-4 ml-4 mr-6 rounded-sm bg-grn font-normal cursor-pointer h-6 w-32 text-wht"
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
    )
  );
};

export default CreatePlayListForm;