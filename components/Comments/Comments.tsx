import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Messages } from "../../common/constants";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";
import { getResourceComments } from "../../api/CommentAPI";
import { ModelType, NotificationType, Pages } from "../../common/types";
import Comment from "../Comment";

const Comments = ({ idTrack }) => {
  const { status, data } = useQuery(
    "comments",
    () =>
      getResourceComments({
        contentId: idTrack,
        typeOfContent: ModelType.Track,
      }).then((res) => (res.data)
      ),
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
      enabled: Boolean(idTrack),
    }
  );
  return (
    <div className="bg-grey h-full flex flex-col ">
      <div className="mb-5 -ml-32">
        <div className="flex flex-row mb-5 -ml-24">
          <h1 className="text-xl font-bold not-italic text-wht">Comments</h1>
          <FontAwesomeIcon
            className="cursor-pointer text-xl font-bold  ml-5 text-wht"
            icon={faComments}
          />
        </div>
        <div className="flex flex-col justify-start items-start rounded bg-drk w-auto h-auto -ml-24">
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
                    <Comment comment={comment} />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-start items-start mt-10 text-lg">
                <h1 className="text-grn whitespace-nowrap">
                  {Messages.EMPTY_COMMENTS}
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
