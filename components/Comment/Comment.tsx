import { faTrashCan,faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Messages } from "../../common/constants";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { getComments } from "../../api/CommentAPI";
import { NotificationType, Pages } from "../../common/types";
import { useState } from "react";
import { useMutation } from "react-query";
import ConfirmDialogDelete from "../ConfirmDialogDelete/ConfirmDialogDelete";
import { deleteComment } from "../../api/CommentAPI";



const Comment = ({ comment, trackId }) => {

  const { data: session } = useSession();

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => 
  
  setShowForm(true);

  const handleCloseDialog = () => setShowForm(false);
  const handleConfirmDelete = () => {
    mutate(comment._id);
    handleCloseDialog();
  };

  const { mutate } = useMutation("deleteComment", deleteComment, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
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

  {/* à remplacer par getSourceComments*/ }
  const { status, data } = useQuery(
    "comments",
    () => getComments().then((res) => res.data),
    {
      onSuccess: (res) => {
        if (res.status === 401) {
          notify("Comments");
          router.replace(`/${Pages.Login}`);
        }
      },
      onError: (error: AxiosError) => {
        if (error.response.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          router.replace(`/${Pages.Login}`);
        }
      },
    }
  );
  return (  

       <div >
        <div className="flex flex-row "  >
          <div className="text-sm font-normal not-italic text-grn"> 
          nmedjoub {/* à remplacer par owner.name */ }
          </div>
          {session && (
             <div >
                  {session.userId === comment.owner && (
                      <FontAwesomeIcon
                        className="cursor-pointer ml-5 text-wht hover:scale-[1.40] hover:text-rd"
                        icon={faTrashCan}
                        onClick={handleShowForm}
                      />
                  )}  
           </div>)}
          
        </div>
        <div className="text-xs font-normal not-italic  text-gry">
           {(new Date(comment.createdAt)).toUTCString()}
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
          msg="Delete Playlist"
        />
      </div>
      )
};

export default Comment;
