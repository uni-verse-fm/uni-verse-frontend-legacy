import React from "react";
import { Messages } from "../../common/constants";
import { notify } from "../Notifications";
import { Form, Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { createComment } from "../../api/CommentAPI";
import { NotificationType,ICreateComment } from "../../common/types";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CreateComment = ({ idContent }) => {
  const { mutate, isLoading } = useMutation("createComment", createComment, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Comment added successfully";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });

  return (
      <div className="flex flex-col justify-start items-start mt-4 ml-10">
        <div className="flex flex-row mb-3" >
          <h1 className="text-sm font-bold not-italic text-grn">
            Add a Comment
          </h1>
          <FontAwesomeIcon
                      className="cursor-pointer ml-5 text-grn"
                      icon={faComment}
                    />
        </div>
        <Formik
          initialValues={{
            description: "",
          }}
          validationSchema={Yup.object().shape({
            description: Yup.string()
          .max(255, Messages.DESCRIPTION)
          .required(Messages.REQUIRED),
          })}
          onSubmit={(value) => {
              // ICreateComment

              let dataComment: ICreateComment = {
                contentId: idContent,
                isPositive: null,
                content: value.description,
                typeOfContent: "Track",
              };

            console.log("dataComment");
            console.log(dataComment);
           
            mutate(dataComment);
          }}
          render={({ values, errors, handleChange, handleBlur }) => {
            return (
              <div className="bg-blk flex w-full h-auto mr-10 mb-12 justify-start items-start    ">
                <Form className="flex flex-col justify-center items-center rounded bg-drk w-auto h-auto">
                  <div className="flex flex-col items-start  w-72 h-auto">
                    <textarea
                    id="description"
                    name="description"
                    className="form-input px-4 py-3 text-sm bg-wht w-full h-full text-drk pl-2  h-20 rounded placeholder-gry"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                    {errors.description && (
                      <div className="text-rd">{errors.description}</div>
                    )}
                  </div>
                  <div className="flex flex-row items-start w-72 h-auto mt-3">
                    <input
                      className="mb-4  rounded-sm bg-grn font-normal cursor-pointer h-6 w-28 text-wht"
                      type="submit"
                      value="Submit"
                    ></input>
                  </div>
                </Form>
              </div>
            );
          }}
        />
      </div>
  );
};
export default CreateComment;
