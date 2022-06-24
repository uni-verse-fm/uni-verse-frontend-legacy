import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Messages } from "../../common/constants";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";
import { getComments } from "../../api/CommentAPI";
import { NotificationType, Pages } from "../../common/types";
import Comment from "../Comment";

const Comments = ({ idTrack }) => {
  {
    /* à remplacer par getSourceComments*/
  }
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
    <div className="Global bg-grey w-full h-full flex flex-col ml-10 ">
      <div>
        <div className="flex flex-row mb-3">
          <h1 className="text-xl font-bold not-italic text-wht">
            Comments
          </h1>
          <FontAwesomeIcon
            className="cursor-pointer text-xl font-bold  ml-5 text-wht"
            icon={faComments}
          />
        </div>
        <div className="flex flex-col justify-start items-start rounded bg-drk w-auto h-auto">
          {status === "loading" ? (
            <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-auto">
              <Spinner />
            </div>
          ) : status === "error" ? (
            <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-auto">
              <h1 className="text-rd whitespace-nowrap">error</h1>
            </div>
          ) : status === "success" ? (
            data.length ? (
              data.map((comment, index) => (
                <div className="flex flex-col mb-3" key={index}>
                  <div key={index}>
                    <Comment comment={comment} trackId={idTrack} />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-start items-start mt-10 text-lg">
                <h1 className="text-grn whitespace-nowrap">
                  {Messages.EMPTY_PLAYLISTS}
                </h1>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comments;
