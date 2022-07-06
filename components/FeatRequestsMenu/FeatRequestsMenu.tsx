import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import { NotificationType, Pages } from "../../common/types";
import { useMutation, useQuery } from "react-query";
import { notify } from "../Notifications";
import {
  acceptRequest,
  findReceivedRequestId,
  findSentRequestId,
  refuseRequest,
} from "../../api/FeatRequestsAPI ";
import { AxiosError } from "axios";
import { Messages } from "../../common/constants";

interface IShowFeatRequests {
  isSent: boolean;
}

const ShowRequests = ({ isSent }: IShowFeatRequests) => {
  const sentRequestQuery = useQuery("sent-requests", findSentRequestId, {
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
        router.replace(`/${Pages.Login}`);
      }
    },
    enabled: isSent,
  });

  const receivedRequestQuery = useQuery(
    "received-requests",
    findReceivedRequestId,
    {
      onError: (error: AxiosError) => {
        if (error.response?.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          router.replace(`/${Pages.Login}`);
        }
      },
      enabled: !isSent,
    }
  );

  const acceptMutation = useMutation("accept-request", acceptRequest, {
    onError: () => {
      notify("Can not accept request, try later.", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Request accepted";
        notify(message, NotificationType.SUCCESS);
        router.reload();
      }
    },
  });

  const refuseMutation = useMutation("accept-request", refuseRequest, {
    onError: () => {
      notify("Can not refuse request, try later.", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Request refused";
        notify(message, NotificationType.SUCCESS);
        router.reload();
      }
    },
  });

  return (
    <Menu as="div" className="text-left h-full w-auto text-grn">
      <Menu.Button className="h-full w-full text-left font-semibold text-grn hover:text-gryf">
        {isSent ? "Sent requests" : "Received requests"}
      </Menu.Button>
      <Menu.Items className="origin-top-right left-0 absolute bg-fakeBlr z-10 h-auto divide-y divide-gray-100 rounded-md">
        {isSent &&
          sentRequestQuery.status === "success" &&
          sentRequestQuery.data?.length > 0 &&
          sentRequestQuery.data.map((request, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-grn bg-opacity-25 text-gryf"
                  } group items-center px-2 py-2 font-semibold text-md`}
                >
                  <div>
                    {request?.dest.username} - {request?.track.title}
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}

        {!isSent &&
          receivedRequestQuery.status === "success" &&
          receivedRequestQuery.data?.length > 0 &&
          receivedRequestQuery.data.map((request, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-grn bg-opacity-25"
                  } flex flex-row gap-2 items-center px-2 py-2 font-semibold text-md`}
                >
                  <div>
                    {request?.user.username} - {request?.track.title}
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    onClick={() => refuseMutation.mutate(request?._id)}
                    className="text-rd cursor-pointer fa-xl"
                  />
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    onClick={() => acceptMutation.mutate(request?._id)}
                    className="text-grn cursor-pointer fa-xl"
                  />
                </div>
              )}
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  );
};
export default ShowRequests;
