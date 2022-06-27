import Image from "next/image";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../api/AuthAPI";
import { notify } from "../Notifications";
import { useMutation } from "react-query";
import { imageSource, Messages } from "../../common/constants";
import { signOut } from "next-auth/react";
import { NotificationType, Pages } from "../../common/types";

const UserDropDown = ({ user }) => {
  const { mutate } = useMutation("logout", logout, {
    onError: () => {
      notify(
        "Your session will expire one we are connected",
        NotificationType.ERROR
      );
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify("Disconnected", NotificationType.ERROR);
      } else {
        notify(Messages.DISCONNECTED, NotificationType.SUCCESS);
      }
    },
  });

  const handleLogout = async () => {
    mutate();
    signOut({ callbackUrl: "/Login" });
  };

  return (
    <Menu as="div" className="text-left h-full w-auto">
      <Menu.Button className="h-full w-auto p-2">
        {user?.profilePicture ? (
          <Image
            src={imageSource + user.profilePicture}
            alt="Uni-verse user avatar"
            className="rounded-full"
            width={42}
            height={42}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-grn fa-2xl hover:text-segrn"
          />
        )}
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {user && (
          <Menu.Item>
            <div className="group items-center rounded-md px-2 py-2 text-md">
              <div>{user.username}</div>
              <div className="font-medium truncate">{user.email}</div>
            </div>
          </Menu.Item>
        )}
        <Link href={`/${Pages.MyProfile}`} passHref>
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active
                    ? "bg-grn bg-opacity-25 text-md cursor-pointer"
                    : "text-sm"
                } group items-center px-2 py-2 font-semibold text-gryf`}
              >
                Dashboard
              </div>
            )}
          </Menu.Item>
        </Link>
        <Link href={`/${Pages.MyProfile}`} passHref>
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active
                    ? "bg-grn bg-opacity-25 text-md cursor-pointer"
                    : "text-sm"
                } group items-center px-2 py-2 font-semibold text-gryf`}
              >
                Earnings
              </div>
            )}
          </Menu.Item>
        </Link>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-serd text-md cursor-pointer" : "text-sm bg-rd"
              } group items-center rounded-b-md px-2 py-2 font-semibold text-white w-full`}
              onClick={handleLogout}
            >
              Sign out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default UserDropDown;
