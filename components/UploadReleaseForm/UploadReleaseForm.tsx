import { faFileAudio, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { Field, Form, Formik, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import UploadImageDisplayer from "../UploadImageDisplayer/UploadImageDisplayer";
import UploadListDisplayer from "../UploadListDisplayer/UploadListDisplayer";

export enum FileType {
  Image = "image",
  Audio = "audio",
}

export const MAX_FILE_SIZE = 10;

export const Extensions = {
  image: {
    extensions: ["PNG", "JPG", "GIF"],
    accept: "image/*",
  },
  audio: {
    extensions: ["MP3", "WAV", "FLAC"],
    accept: "audio/*",
  },
};

const UploadReleaseForm = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  const pullFileFromUploader = (file) => {
    setFiles([...files, file]);
  };

  const pullFilesFromDisplayer = (files) => {
    setFiles(files);
  };

  const pullImageFromUploader = (image) => {
    setImage(image);
  };

  const pullImageFromDisplayer = (state) => {
    setImage(state);
  };

  const validateImage = () => {
    if (image && image.size >= MAX_FILE_SIZE) {
      return "Image is too large";
    }
    return "Please upload an image";
  };

  const validateFiles = () => {
    if (
      files.length > 0 &&
      files.filter((file) => file.size >= MAX_FILE_SIZE).length > 0
    ) {
      return "One or more files are too large";
    }
    return "You must upload at least one file";
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        file: undefined,
        image: undefined,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .max(15, "Must be 15 characters or less")
          .min(5, "Must be at least 5 characters or less")
          .required("Required"),
        description: Yup.string()
          .max(255, "Must be 255 characters or less")
          .required("Required"),
      })}
      onSubmit={(value) => {
        console.log("Function not implemented.");
      }}
      render={({ values, errors, handleChange, handleBlur }) => {
        return (
          <Form>
            <div className="flex flex-row justify-between m-16">
              <div className="basis-1/3 mr-4 mt-4 rounded h-full grid place-content-center">
                <Field
                  name="image"
                  component={UploadImageDisplayer}
                  id="image"
                  title="Cover photo"
                  icon={faFileImage}
                  validate={validateImage}
                  maxFileSize="10"
                  fileExtensions={Extensions.image}
                  image={image}
                  onDelete={pullImageFromUploader}
                  onChange={pullImageFromDisplayer}
                />
              </div>
              <div className="basis-1/3 mr-4 mt-4">
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
              <div className="basis-1/3 ml-4 mt-4">
                <div className="border-2 border-grn rounded h-full grid grid-cols-1 content-center basis-1/2 mr-2 text-center">
                  <Field
                    name="file"
                    component={UploadListDisplayer}
                    id="audio"
                    title="Track"
                    icon={faFileAudio}
                    validate={validateFiles}
                    maxFileSize="10"
                    fileExtensions={Extensions.audio}
                    func={pullFileFromUploader}
                    contentType={"track"}
                  />
                </div>
                {errors.file ? (
                  <div className="text-rd">{errors.file}</div>
                ) : null}
              </div>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default UploadReleaseForm;
