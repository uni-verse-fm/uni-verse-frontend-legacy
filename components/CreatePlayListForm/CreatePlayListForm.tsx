import React from "react";
import { Messages } from "../../common/constants";
import { notify } from "../Notifications";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { createPlaylist } from "../../api/PlaylistAPI";
import { NotificationType } from "../../common/types";

const CreatePlayListForm = ({
  showForm,
  handleHidecreatePlaylistIndex,
  refetch,
}) => {
  const { mutate } = useMutation("createPlaylist", createPlaylist, {
    onError: (err) => {
      notify("Can not create playlist" + err, NotificationType.ERROR);
    },
    onSuccess: async (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        handleHidecreatePlaylistIndex();
        const message = "PlayList created successfully";
        notify(message, NotificationType.SUCCESS);
        await refetch();
      }
    },
  });

  return (
    showForm && (
      <div className="flex flex-col justify-center items-center mt-4">
        <div>
          <h1 className="text-xl font-bold not-italic text-grn  -ml-40 mb-3">
            Add a playList
          </h1>
        </div>
        <Formik
          initialValues={{
            title: "",
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .max(15, Messages.TITLE)
              .min(1, Messages.TITLE)
              .required(Messages.REQUIRED),
          })}
          onSubmit={(value) => {
            console.debug(value);
            mutate(value);
          }}
          render={({ values, errors, handleChange, handleBlur }) => {
            return (
              <div className="bg-blk flex w-full h-auto mr-10 mb-12 justify-center items-center    ">
                <Form className="flex flex-col justify-center items-center rounded bg-wht w-auto h-auto">
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
                      className="text-sm bg-drk w-full h-full text-wht pl-2  h-8 rounded placeholder-gry"
                      value={values.title}
                    />
                    {errors.title && (
                      <div className="text-rd">{errors.title}</div>
                    )}
                  </div>

                  <div className="flex flex-row items-start w-72 h-auto">
                    <input
                      className="mb-4 ml-6 rounded-sm bg-grn font-normal cursor-pointer h-7 w-32 text-wht"
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
export default CreatePlayListForm;
