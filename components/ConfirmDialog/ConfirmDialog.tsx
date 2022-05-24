import React from "react";
import {
  SaveButton,
  Toolbar,
  Edit,
  SimpleForm,
  useNotify,
  Confirm,
} from "react-admin";

const ConfirmDialog = ({ showForm, handleDialogClose, handleConfirm, msg }) => {
  {
    /** ConfirmDialog */
  }
  var ct = "Do you really want to continue ?";
  return (
    <>
    <div className="text-grn">
      <Confirm
        sx={{color: 'success.dark'}}
        isOpen={showForm}
        title={msg}
        content={ct}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
        confirm="Delete"
        cancel="Cancel"
      />
      </div>
    </>
  );
};

export default ConfirmDialog;
