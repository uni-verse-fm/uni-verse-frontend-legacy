import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Messages } from "../../common/constants";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";
import { getResourceComments } from "../../api/CommentAPI";
import {  NotificationType, Pages } from "../../common/types";
import Comment from "../Comment";

const Comments = ({ idTrack, typeOfContent }) => {
  const { status, data } = useQuery(
    `comments-${idTrack}`,
    () =>
      getResourceComments({
        contentId: idTrack,
        typeOfContent: typeOfContent ,
      }).then((res) => res.data),
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
    <div className="bg-grey h-full flex flex-col w-auto mt-10">
      <div className="">
        <div className="flex flex-row py-4">
          <h1 className="text-2xl font-bold not-italic text-wht">Comments</h1>
          <FontAwesomeIcon
            className="cursor-pointer text-xl font-bold ml-5 text-wht"
            icon={faComments}
          />
        </div>
        <div className="flex flex-col justify-start items-start rounded bg-drk w-full h-full">
          {status === "loading" ? (
            <div className="h-full flex w-full items-center justify-center">
              <Spinner />
            </div>
          ) : status === "error" ? (
            <div className="h-full flex w-full items-center justify-center">
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
              <div className="h-full flex w-full items-center justify-center">
                <h1 className="text-grn whitespace-nowrap">
                  {Messages.EMPTY_COMMENTS}
                </h1>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
