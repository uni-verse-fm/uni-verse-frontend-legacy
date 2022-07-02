import React from "react";
import { Messages } from "../../common/constants";
import { notify } from "../Notifications";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { updateComment } from "../../api/CommentAPI";
import {
  IUpdatePayload,
  NotificationType,
  IUpdateCommentData,
} from "../../common/types";

const UpdateCommentForm = ({
  showForm,
  handleHideUpdateComment,
  dataUpdate,
}) => {
  const { mutate } = useMutation("updateComment", updateComment, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        handleHideUpdateComment();
        const message = "Comment updated successfully";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });
  return (
    showForm && (
      <div className="">
        <Formik
          initialValues={{
            description: dataUpdate.content,
          }}
          validationSchema={Yup.object().shape({
            description: Yup.string()
              .max(255, Messages.DESCRIPTION)
              .required(Messages.REQUIRED),
          })}
          onSubmit={(value) => {
            let dataToUpdate: IUpdateCommentData = {
              contentId: dataUpdate.modelId,
              isPositive: dataUpdate.isPositive,
              content: value.description,
              typeOfContent: dataUpdate.modelType,
            };
            let dataForm: IUpdatePayload = {
              id: dataUpdate._id,
              data: dataToUpdate,
            };

            console.log(dataForm);
            mutate(dataForm);
          }}
          render={({ values, errors, handleChange, handleBlur }) => {
            return (
              <div className="bg-blk flex w-full h-auto  mb-12 justify-center items-center  ">
                <Form className="flex flex-col justify-start items-start rounded bg-drk w-auto h-auto">
                  <div className="flex flex-col items-start pb-2 w-72 h-auto">
                    <textarea
                      id="description"
                      name="description"
                      className="form-input px-1 py-1 text-sm bg-wht w-full h-full text-drk rounded placeholder-gry"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    {errors.description && (
                      <div className="text-rd">{errors.description}</div>
                    )}
                  </div>
                  <div className="flex flex-row items-start h-auto w-64">
                    <input
                      className="mb-4 rounded bg-drk mr-2 font-normal cursor-pointer h-4 text-xs text-grn"
                      type="submit"
                      value="Save"
                    ></input>
                    <button
                      className="mb-4 rounded bg-drk font-normal cursor-pointer h-4 text-xs text-rd"
                      onClick={handleHideUpdateComment}
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
export default UpdateCommentForm;
