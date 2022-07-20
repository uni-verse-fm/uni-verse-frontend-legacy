import { faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListMessages from "../ListMessages/ListMessages";

import { Messages } from "../../common/constants";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";

import SendMessage from "../SendMessage";

import { NotificationType, Pages } from "../../common/types";
import { getContactMessages } from "../../api/MessageAPI";
import { useState } from "react";

const MessagesScreen = ({ idContact }) => {
  const [showFormSendMessage, setShowFormSendMessage] = useState(false);
  const handleShowFormSendMessage = () => setShowFormSendMessage(true);
  const handleCloseFormSendMessage = () => setShowFormSendMessage(false);

  const messageQuery = useQuery(
    `messagess-${idContact}`,
    () => getContactMessages(idContact as string).then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log("res.data messages");
        console.log(res.data);
        if (res.status === 401) {
          notify("Messages");
          router.replace(`/${Pages.Login}`);
        }
      },
      onError: (error: AxiosError) => {
        if (error.response.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          router.replace(`/${Pages.Login}`);
        }
      },
      enabled: Boolean(idContact),
    }
  );

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-10">
      <div className="flex flex-row py-4 mt-10 mb-5">
        <h1 className="text-2xl font-bold not-italic text-wht">Messages </h1>
        <FontAwesomeIcon
          className="cursor-pointer text-xl font-bold ml-5 text-wht"
          icon={faMessage}
        />
      </div>
      {(messageQuery.data?.length as number) > 0 ? (
        <>
          <div
            className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 mb-4 flex justify-center items-center hover:bg-opacity-100"
            onClick={handleShowFormSendMessage}
          >
            <FontAwesomeIcon
              className=" cursor-pointer hover:scale-[1.40] text-grn "
              icon={faPlus}
            />
          </div>
          <ListMessages messages={messageQuery.data} />

          <SendMessage
            showModal={showFormSendMessage}
            handleCloseDialog={handleCloseFormSendMessage}
            dest={idContact}
          />
        </>
      ) : (
        <div className="flex justify-center items-center mt-10 text-lg">
          <h1 className="text-rd whitespace-nowrap">Can not load data</h1>
        </div>
      )}
    </div>
  );
};

export default MessagesScreen;
