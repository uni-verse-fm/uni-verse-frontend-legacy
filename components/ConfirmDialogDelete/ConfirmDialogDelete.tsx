const ConfirmDialogDelete = (props) => {
  return (
    props.showModal && (
      <div
        className={`[config]="{ignoreBackdropClick: true, keyboard: false}" absolute justify-center items-center overflow-x-hidden overflow-y-auto h-auto bg-wht -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2  ${
          props.small ? "w-auto" : "w-auto"
        } border-2 border-grn rounded-md`}
      >
        <div className="bg-blk flex w-full h-auto mr-10 justify-center items-center   ">
          <div className="flex flex-col items-start p-4 w-72 h-auto  ">
            <label className="mb-5 text-rd text-lg">{props.msg}</label>

            <label className="mb-5 text-blk">
              Do you really want to continue ?
            </label>

            <div className="flex flex-row items-start w-72 h-auto">
              <button
                className="mb-4  mr-6 rounded-sm bg-grn font-normal cursor-pointer h-7 w-32 text-wht"
                onClick={props.handleConfirmDelete}
              >
                Delete
              </button>

              <button
                className="mb-4 ml-4 mr-6 rounded-sm bg-grn font-normal cursor-pointer h-7 w-32 text-wht"
                onClick={props.handleCloseDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmDialogDelete;
