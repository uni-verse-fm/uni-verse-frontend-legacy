import { faFileAudio, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { createResourcePack } from "../../api/ResourcePackAPI";
import {
  Extensions,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
  Messages,
  urlImage,
} from "../../common/constants";
import Counter from "../Counter";
import { NotificationType, notify } from "../Notifications";
import UploadImageDisplayer from "../UploadImageDisplayer";
import UploadResourcesListDisplayer from "../UploadResourcesListDisplayer";
import { IResource } from "../UploadResourcesListDisplayer/UploadResourcesListDisplayer";

export interface ICreateRelease {
  title: string;
  description: string;
  resources: IResource[];
  image: File,
  accessType: AccessType,
  amount?: number,
}

const enum AccessType {
  Free = "free",
  Paid = "paid",
  Donation = "donation",
}

export interface UniVerseError {
  statusCode?: number;
  message?: string;
}

const UploadResourcePackForm = ({ me }) => {
  const { mutate, isLoading } = useMutation(
    "uploadResourcePack",
    createResourcePack,
    {
      onError: (error: AxiosError) => {
        const errorMessage: UniVerseError = error.response.data;
        notify(
          `Can't upload resource-pack: ${errorMessage.message}`,
          NotificationType.ERROR
        );
      },
      onSuccess: (res) => {
        if (res.status !== 201) {
          notify(res.data.message, NotificationType.ERROR);
        } else {
          const message = "Resource-pack uploaded";
          notify(message, NotificationType.SUCCESS);
        }
      },
    }
  );

  const initialValues: ICreateRelease = {
      title: "",
      description: "",
      resources: [],
      image: null,
      accessType: AccessType.Free,
      amount: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .max(15, Messages.TITLE)
          .min(5, Messages.TITLE)
          .required(Messages.REQUIRED),
        description: Yup.string()
          .max(255, Messages.DESCRIPTION)
          .required(Messages.REQUIRED),
        accessType: Yup.string(),
        amount: Yup.number().test(
          "resourceFileSize",
          "The amount should be bigger than 0",
          (value) => {
            return (
              Yup.ref("accessType").getValue.toString() !== AccessType.Free &&
              value >= 1
            );
          }
        ),
        resources: Yup.mixed()
          .test(
            "resourcesNumber",
            Messages.NO_FILE,
            (value) => value?.length > 0
          )
          .test("resourceFileSize", Messages.LARGE_FILE_LIST, (value) => {
            return (
              value?.filter((resource) => resource.file.size >= MAX_FILE_SIZE)
                .length === 0
            );
          })
          .test("previewFileSize", Messages.LARGE_FILE_LIST, (value) => {
            return (
              value?.filter(
                (resource) => resource.previewFile?.size >= MAX_FILE_SIZE
              ).length === 0
            );
          })
          .test(
            "previeFilewNameDuplicate",
            Messages.FILE_NAME_DUPLICATE,
            (value) => {
              const previewFileNames = value
                ?.map((resource: IResource) => resource.previewFile?.name)
                .filter((previewName: string | undefined) => previewName);
              return (
                value &&
                new Set(previewFileNames).size === previewFileNames.length
              );
            }
          )
          .test("fileNameDuplicate", Messages.FILE_NAME_DUPLICATE, (value) => {
            const fileNames = value?.map((resource) => resource.file.name);
            return value && new Set(fileNames).size === fileNames.length;
          })
          .test("titleDuplicate", Messages.TITLE_DUPLICATE, (value) => {
            const titles = value?.map((resource) => resource.title);
            return value && new Set(titles).size === titles.length;
          }),
        image: Yup.mixed()
          .required()
          .test("fileSize", Messages.LARGE_FILE, (value) =>
            value ? value.size < MAX_IMAGE_SIZE : true
          ),
      })}
      onSubmit={(value: ICreateRelease) => {
        const data = {
          title: value.title,
          description: value.description,
          resources: value.resources.map((resource) => ({
            title: resource.title,
            originalFileName: resource.file.name,
            previwFileName: resource.previewFile.name,
            author: me._id,
          })),
        };
        var bodyFormData = new FormData();
        bodyFormData.append("data", JSON.stringify(data).replace(/ /g, ""));
        value.resources.forEach((resource) => {
          bodyFormData.append("resources", resource.file, resource.file.name);
          resource.previewFile 
        }
        );
        value.resources.forEach(
          (resource: IResource) =>
            resource.previewFile &&
            bodyFormData.append(
              "previews",
              resource.previewFile,
              resource.previewFile.name
            )
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
                    defaultImageSrc={urlImage}
                  />
                  {errors.image && (
                    <div className="text-rd mt-4">{errors.image}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-grn">
                    Resource-pack title
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
                  <div className="flex w-full items-center">
                    <div className="flex flex-col w-full">
                      <label htmlFor="accessType" className="text-grn mt-4">
                        Users access
                      </label>
                      <select
                        id="accessType"
                        name="accessType"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-input px-4 py-1 rounded"
                      >
                        <option value={AccessType.Free}>Free</option>
                        <option value={AccessType.Paid}>Paid</option>
                        <option value={AccessType.Donation}>Donation</option>
                      </select>
                    </div>
                    {values.accessType != AccessType.Free && (
                      <div className="flex flex-col mx-4">
                        <label htmlFor="amount" className="text-grn mt-4">
                          Amount
                        </label>
                        <Field
                          id="amount"
                          name="amount"
                          title="amount"
                          component={Counter}
                          amount={values.amount}
                          icon={faFileAudio}
                          setAmount={setFieldValue}
                        />
                      </div>
                    )}
                  </div>
                  {errors.amount && (
                    <div className="text-rd">{errors.amount}</div>
                  )}
                  <label htmlFor="lastName" className="text-grn mt-4">
                    Resource-pack description
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
                    name="resources"
                    component={UploadResourcesListDisplayer}
                    id="audio"
                    title="resources"
                    icon={faFileAudio}
                    setFieldValue={setFieldValue}
                    maxFileSize={MAX_FILE_SIZE}
                    fileExtensions={Extensions.audio}
                    contentType={"resource"}
                  />
                </div>
                {errors.resources && (
                  <div className="text-rd">{errors.resources}</div>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UploadResourcePackForm;
