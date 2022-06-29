import React, { useState } from "react";
import { Messages } from "../../common/constants";
import { notify } from "../Notifications";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { createComment } from "../../api/CommentAPI";
import { NotificationType, ICreateComment } from "../../common/types";
import {
  faComment,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";

enum LikeDislike {
  Like,
  Dislike,
}

const CreateComment = ({ idContent }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const { mutate } = useMutation("createComment", createComment, {
    onError: () => {
      notify("Can not create comment", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Comment added successfully";
        notify(message, NotificationType.SUCCESS);
        router.reload();
      }
    },
  });

  const toggleLikeDislike = (likeDislike: LikeDislike) => () => {
    switch (likeDislike) {
      case LikeDislike.Like:
        setLike(true);
        setDislike(false);
        break;
      case LikeDislike.Dislike:
        setLike(false);
        setDislike(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col justify-start items-start mt-4">
      <div className="flex flex-row mb-3 w-full">
        <h1 className="text-sm font-bold not-italic text-grn">Add a Comment</h1>
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
          let dataComment: ICreateComment = {
            contentId: idContent,
            isPositive: like,
            content: value.description,
            typeOfContent: "Track",
          };

          mutate(dataComment);
        }}
        render={({ values, errors, handleChange, handleBlur }) => {
          return (
            <div className="bg-blk flex w-full justify-start items-start">
              <Form className="flex flex-col justify-center items-start rounded bg-drk grow">
                <div className="flex flex-col items-start w-full h-auto">
                  <textarea
                    id="description"
                    name="description"
                    className="form-input px-4 py-3 text-sm bg-wht w-full h-full text-drk pl-2 h-20 rounded placeholder-gry"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {errors.description && (
                    <div className="text-rd">{errors.description}</div>
                  )}
                </div>
                <div className="flex flex-row items-start justify-between w-full h-auto mt-3">
                  <input
                    className="mb-4 rounded-sm bg-grn font-normal cursor-pointer h-6 w-20 text-wht"
                    type="submit"
                    value="Submit"
                    disabled={!(like || dislike) || !values.description.length}
                  ></input>

                  <div>
                    <span className={`mx-2`}>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className={`text-grn fa-xl ${
                          like ? "" : "text-opacity-40"
                        }`}
                        onClick={toggleLikeDislike(LikeDislike.Like)}
                      />
                    </span>
                    <span className={`mx-2`}>
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        className={`text-rd fa-xl ${
                          dislike ? "" : "text-opacity-40"
                        }`}
                        onClick={toggleLikeDislike(LikeDislike.Dislike)}
                      />
                    </span>
                  </div>
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
