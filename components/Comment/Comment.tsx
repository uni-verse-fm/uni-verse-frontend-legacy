import {
  faTrashCan,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import { notify } from "../Notifications";
import { useSession } from "next-auth/react";
import { NotificationType } from "../../common/types";
import { useState } from "react";
import { useMutation } from "react-query";
import ConfirmDialogDelete from "../ConfirmDialogDelete";
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
      <div className="flex flex-row">
        <div className="text-lg font-normal not-italic text-grn">
          {comment?.owner?.username}
        </div>

        {session && (
          <div>
            {(session.user as any).id === comment.owner._id && (
              <FontAwesomeIcon
                className="cursor-pointer ml-5 text-rd text-xs hover:scale-[1.40] hover:text-rd"
                icon={faTrashCan}
                onClick={handleShowForm}
              />
            )}
          </div>
        )}
      </div>
      <div className="text-sm font-normal not-italic  text-gry">
        {isoDateToDateHour(comment.createdAt)}
      </div>

      <div className="flex flex-row justify-between w-full">
        <div className="text-md font-normal not-italic text-wht mb-5">
          {comment.content}
        </div>
        {comment.isPositive == true ? (
          <FontAwesomeIcon className="text-grn fa-xl" icon={faThumbsUp} />
        ) : (
          <FontAwesomeIcon className="text-rd fa-xl" icon={faThumbsDown} />
        )}
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
