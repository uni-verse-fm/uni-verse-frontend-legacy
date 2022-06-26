import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import { notify } from "../Notifications";
import { useSession } from "next-auth/react";
import { NotificationType } from "../../common/types";
import { useState } from "react";
import { useMutation } from "react-query";
import ConfirmDialogDelete from "../ConfirmDialogDelete/ConfirmDialogDelete";
import { deleteComment } from "../../api/CommentAPI";

import { isoDateToDateHour } from "../../utils/dateUtils";

const Comment = ({ comment }) => {
  const { data: session } = useSession();

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const handleConfirmDelete = () => {
    mutate(comment._id);
    handleCloseDialog();
  };

  const { mutate } = useMutation("deleteComment", deleteComment, {
    onError: () => {
      notify("Can not delete comment", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Comment deleted";
        notify(message, NotificationType.SUCCESS);
        router.reload();
      }
    },
  });

  return (
    <div>
      <div className="flex flex-row ">
        <div className="text-sm font-normal not-italic text-grn">
          {comment?.owner?.username}
        </div>
        {session && (
          <div>
            {(session.user as any).id === comment.owner && (
              <FontAwesomeIcon
                className="cursor-pointer ml-5 text-wht hover:scale-[1.40] hover:text-rd"
                icon={faTrashCan}
                onClick={handleShowForm}
              />
            )}
          </div>
        )}
      </div>
      <div className="text-xs font-normal not-italic  text-gry">
        {/*(new Date(comment.createdAt)).toUTCString()*/}
        {isoDateToDateHour(comment.createdAt)}
      </div>
      <div className="text-sm font-normal not-italic text-wht mb-5">
        {comment.content}
      </div>

      <ConfirmDialogDelete
        data-backdrop="static"
        data-keyboard="false"
        small={true}
        showModal={showForm}
        handleCloseDialog={handleCloseDialog}
        handleConfirmDelete={handleConfirmDelete}
        msg="Delete Comment"
      />
    </div>
  );
};

export default Comment;
