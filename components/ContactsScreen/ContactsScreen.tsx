import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListContacts from "../ListContacts/ListContacts";
import { useSession } from "next-auth/react";

import { Messages } from "../../common/constants";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";

import { getContacts } from "../../api/MessageAPI";

import { NotificationType, Pages } from "../../common/types";

const ContactsScreen = () => {
  const { data: session } = useSession();
  const contactsQuery = useQuery(
    `contacts-${(session?.user as any)?.id}`,
    () => getContacts().then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log("(session?.user as any)?.id");
        console.log((session?.user as any)?.id);
        console.log("resContacts");
        console.log(res);
        if (res.status === 401) {
          notify("Contacts");
          router.replace(`/${Pages.Login}`);
        }
      },
      onError: (error: AxiosError) => {
        if (error.response.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          router.replace(`/${Pages.Login}`);
        }
      },
      enabled: Boolean((session?.user as any)?.id),
    }
  );

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-10">
      <div className="flex flex-row py-4 mt-10 mb-5">
        <h1 className="text-2xl font-bold not-italic text-wht">Messages</h1>
        <FontAwesomeIcon
          className="cursor-pointer text-xl font-bold ml-5 text-wht"
          icon={faMessage}
        />
      </div>
      {(contactsQuery.data?.length as number) > 0 ? (
        <ListContacts contacts={contactsQuery.data} />
      ) : (
        <div className="flex justify-center items-center mt-10 text-lg">
          <h1 className="text-grn whitespace-nowrap">
            {Messages.EMPTY_CONTACTS}
          </h1>
        </div>
      )}
    </div>
  );
};

export default ContactsScreen;
