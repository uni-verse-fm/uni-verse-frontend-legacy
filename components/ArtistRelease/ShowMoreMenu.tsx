import Image from "next/image";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faEllipsis } from "@fortawesome/free-solid-svg-icons";
import useConnect from "../../common/providers/ConnectProvider";
import { logout } from "../../api/AuthAPI";
import { NotificationType, notify } from "../Notifications";
import { useMutation } from "react-query";
import router from "next/router";
import { Messages } from "../../common/constants";
import { Pages } from "../../common/constants";

import MenuSelectPlaylist from "./MenuSelectPlaylist";

const ShowMoreMenu = ({ track }) => {
  /*const [connect, setConnect] = useConnect();

  const clientDisconnect = () =>
    (document.cookie = "Authentication=; Max-Age=0;secure; path=/;");

  const { mutate, isLoading } = useMutation("logout", logout, {
    onError: (error) => {
      notify("Your session will expire" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify("Disconnected", NotificationType.ERROR);
      } else {
        notify(Messages.DISCONNECTED, NotificationType.SUCCESS);
      }
    },
  });

  const handleLogout = () => {
    mutate();
    setConnect(false);
    router.replace("/");
    clientDisconnect();
  };*/

  return (
    <Menu as="div" className="text-left h-full w-auto">
      <Menu.Button className="h-full w-auto p-2">
            <FontAwesomeIcon
                          className=" cursor-pointer hover:scale-[1.40] hover:text-grn text-gry"
                          icon={faEllipsis}
            />
      </Menu.Button>
      <Menu.Items className="hover-text-grn text-blck absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
          {({ active }) => (
            <div className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center px-2 py-2 font-semibold text-gryf`}>
              <MenuSelectPlaylist track= {track} />  
            </div>)}
          </Menu.Item>
          <Menu.Item>
          {({ active }) => (
            <div className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center px-2 py-2 font-semibold text-gryf`}>
                <button
                 onClick={(_: any) =>
                  notify(Messages.NOT_IMPLEMENTED, NotificationType.ERROR)
                }>
                  Artist
                </button>
            </div>)}
          </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ShowMoreMenu;
