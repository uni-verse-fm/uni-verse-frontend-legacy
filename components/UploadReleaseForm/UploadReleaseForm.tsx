import { faFileAudio, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { createRelease } from "../../api/ReleaseAPI";
import {
  Extensions,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
  Messages,
} from "../../common/constants";
import { NotificationType, UniVerseError } from "../../common/types";
import { notify } from "../Notifications";
import UploadImageDisplayer from "../UploadImageDisplayer";
import UploadTracksListDisplayer from "../UploadTracksListDisplayer/UploadTracksListDisplayer";

const UploadReleaseForm = ({ myId }) => {
  const { mutate } = useMutation("uploadRelease", createRelease, {
    onError: (error: AxiosError) => {
      const errorMessage: UniVerseError = error.response.data;
      notify(
        `Can't upload release: ${errorMessage.message}`,
        NotificationType.ERROR
      );
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Release uploader";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        tracks: [],
        image: null,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .max(15, Messages.TITLE)
          .min(5, Messages.TITLE)
          .required(Messages.REQUIRED),
        description: Yup.string()
          .max(255, Messages.DESCRIPTION)
          .required(Messages.REQUIRED),
        tracks: Yup.mixed()
          .test("tracksNumber", Messages.NO_FILE, (value) => value?.length > 0)
          .test("trackFileSize", Messages.LARGE_FILE_LIST, (value) => {
            return (
              value?.filter((track) => track.file.size >= MAX_FILE_SIZE)
                .length === 0
            );
          })
          .test("fileNameDuplicate", Messages.FILE_NAME_DUPLICATE, (value) => {
            const fileNames = value?.map((track) => track.file.name);
            return value && new Set(fileNames).size === fileNames.length;
          })
          .test("titleDuplicate", Messages.TITLE_DUPLICATE, (value) => {
            const titles = value?.map((track) => track.title);
            return value && new Set(titles).size === titles.length;
          }),
        image: Yup.mixed()
          .required()
          .test("fileSize", Messages.LARGE_FILE, (value) =>
            value ? value.size < MAX_IMAGE_SIZE : true
          ),
      })}
      onSubmit={(value) => {
        const data = {
          title: value.title,
          description: value.description,
          tracks: value.tracks.map((track) => ({
            title: track.title,
            originalFileName: track.file.name,
            author: myId,
            feats: track.feats,
          })),
        };
        var bodyFormData = new FormData();
        const spacesRegex = /\s+(?=([^"]*"[^"]*")*[^"]*$)/g;
        const stringData = JSON.stringify(data)
          .replace(spacesRegex, "")
          .replace(/\s+/g, " ");
        bodyFormData.append("data", stringData);
        value.tracks.forEach((track) =>
          bodyFormData.append("tracks", track.file, track.file.name)
        );
        value.image &&
          bodyFormData.append("cover", value.image, value.image.name);
        mutate(bodyFormData);
      }}
    >
      {({ values, errors, handleChange, handleBlur, setFieldValue }) => {
        return (
          <Form>
            <div className="flex flex-row justify-between m-16">
              <div className="basis-1/3 mr-4 mt-4">
                <div className="rounded text-center">
                  <Field
                    name="image"
                    component={UploadImageDisplayer}
                    id="image"
                    title="Cover photo"
                    icon={faFileImage}
                    maxFileSize="10"
                    fileExtensions={Extensions.image}
                    setFieldValue={setFieldValue}
                    defaultImageSrc={"/Playlist.png"}
                  />
                  {errors.image && (
                    <div className="text-rd mt-4">{errors.image}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-grn">
                    Release title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-input px-4 py-3 rounded"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  {errors.title ? (
                    <div className="text-rd">{errors.title}</div>
                  ) : null}
                  <label htmlFor="lastName" className="text-grn mt-4">
                    Release description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-input px-4 py-3 rounded"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {errors.description ? (
                    <div className="text-rd">{errors.description}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-grn hover:bg-segrn"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="basis-2/3 ml-4 mt-4">
                <div className="border-2 border-grn rounded h-full grid grid-cols-1 content-center basis-1/2 mr-2 text-center">
                  <Field
                    name="tracks"
                    component={UploadTracksListDisplayer}
                    id="audio"
                    title="Track"
                    icon={faFileAudio}
                    setFieldValue={setFieldValue}
                    maxFileSize={MAX_FILE_SIZE}
                    fileExtensions={Extensions.audio}
                    contentType={"track"}
                  />
                </div>
                {errors.tracks && (
                  <div className="text-rd">{errors.tracks}</div>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UploadReleaseForm;
