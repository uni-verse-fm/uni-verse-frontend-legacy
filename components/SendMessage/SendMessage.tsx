import React, { useState } from "react";
import { Messages } from "../../common/constants";
import { notify } from "../Notifications";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { createMessage } from "../../api/MessageAPI";
import { NotificationType, ICreateMessage } from "../../common/types";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import Modal from "../Modal";
import { useQuery } from "react-query";
import { getUserById } from "../../api/UserAPI";

const SendMessage = ({ showModal, handleCloseDialog, dest }) => {
  const userQuery = useQuery(
    `user-${dest}`,
    () => getUserById(dest as string).then((res) => res.data),
    { enabled: Boolean(!!dest) }
  );

  const { mutate } = useMutation("createMessage", createMessage, {
    onError: () => {
      notify("Can not send this Message", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        handleCloseDialog();
        router.reload();
        const message = "Message sent successfully";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });
  return (
    <Modal
      showModal={showModal}
      handleCloseModal={handleCloseDialog}
      customHeader={<div></div>}
    >
      <div className="flex flex-col justify-start items-start mt-4 p-20">
        <div className="flex flex-row mb-5 w-full">
          <h1 className="text-2xl font-bold not-italic text-grn">
            New Message
          </h1>
          <FontAwesomeIcon
            className="cursor-pointer ml-5 text-grn text-2xl"
            icon={faMessage}
          />
        </div>

        <div className="flex flex-row mb-5 w-full">
          <h1 className="text-xl font-bold not-italic text-wht">
            to : {userQuery?.data?.username}{" "}
          </h1>
        </div>
        <Formik
          initialValues={{
            description: "",
          }}
          validationSchema={Yup.object().shape({
            description: Yup.string()
              .max(70, Messages.MSG)
              .required(Messages.REQUIRED),
          })}
          onSubmit={(value) => {
            let dataMessage: ICreateMessage = {
              dest: dest,
              content: value.description,
            };
            console.log("dataMessage");
            console.log(dataMessage);
            mutate(dataMessage);
          }}
          render={({ values, errors, handleChange, handleBlur }) => {
            return (
              <div className="bg-blk flex w-full justify-start items-start">
                <Form className="flex flex-col justify-center items-start rounded bg-mdrk grow">
                  <div className="flex flex-col items-start w-full h-auto">
                    <textarea
                      id="description"
                      name="description"
                      className="form-input px-4 py-3 text-sm bg-wht w-full h-full text-mdrk pl-2 h-48 rounded placeholder-gry"
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
                      value="Send"
                    ></input>
                  </div>
                </Form>
              </div>
            );
          }}
        />
      </div>
    </Modal>
  );
};
export default SendMessage;
