import { faFileAudio, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Extensions,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
  Messages,
  urlImage,
} from "../../common/constants";
import { NotificationType, notify } from "../Notifications";
import UploadImageDisplayer from "../UploadImageDisplayer";
import UploadListDisplayer from "../UploadListDisplayer";

const UploadReleaseForm = () => {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        files: [],
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
        files: Yup.mixed()
          .test("filesNumber", Messages.NO_FILE, (value) => value?.length > 0)
          .test("fileSize", Messages.LARGE_FILE_LIST, (value) => {
            return (
              value?.filter((file) => file.size >= MAX_FILE_SIZE).length === 0
            );
          })
          .test("fileNameDuplicate", Messages.FILE_NAME_DUPLICATE, (value) => {
            const names = value?.map((file) => file.name);

            return value && new Set(names).size === names.length;
          }),
        image: Yup.mixed().test("fileSize", Messages.LARGE_FILE, (value) =>
          value ? value.size >= MAX_IMAGE_SIZE : true
        ),
      })}
      onSubmit={(value) => {
        notify(
          "Im on submit boy and i try to ake it",
          NotificationType.DEFAULT
        );
      }}
      render={({ values, errors, handleChange, handleBlur, setFieldValue }) => {
        return (
          <Form>
            <div className="flex flex-row justify-between m-16">
              <div className="basis-1/3 mr-4 mt-4 rounded h-full grid place-content-center text-center">
                <Field
                  name="image"
                  component={UploadImageDisplayer}
                  id="image"
                  title="Cover photo"
                  icon={faFileImage}
                  maxFileSize="10"
                  fileExtensions={Extensions.image}
                  setFieldValue={setFieldValue}
                  defaultImageSrc={urlImage}
                />
                {errors.image && (
                  <div className="text-rd mt-4">{errors.image}</div>
                )}
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
                    name="files"
                    component={UploadListDisplayer}
                    id="audio"
                    title="Track"
                    icon={faFileAudio}
                    setFieldValue={setFieldValue}
                    maxFileSize={MAX_FILE_SIZE}
                    fileExtensions={Extensions.audio}
                    contentType={"track"}
                  />
                </div>
                {errors.files && <div className="text-rd">{errors.files}</div>}
              </div>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default UploadReleaseForm;
