import React from "react";
import {
  SaveButton,
  Toolbar,
  Edit,
  SimpleForm,
  useNotify,
  Confirm,
} from "react-admin";
import { useForm } from "react-hook-form";
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

const ConfirmDialog = ({ showForm, handleDialogClose, handleConfirm, msg }) => {
  {
    /** ConfirmDialog */
  }
  var ct = "Do you really want to continue ?";
  return (
    <>
      <Confirm
        className="text-grn"
        isOpen={showForm}
        title={msg}
        content={ct}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
        confirm="Delete"
        cancel="Cancel"
      />
    </>
  );
};

export default ConfirmDialog;
