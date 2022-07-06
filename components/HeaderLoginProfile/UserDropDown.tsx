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
import ShowRequests from "../FeatRequestsMenu/FeatRequestsMenu";

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
    <Menu as="div" className="text-left h-full w-auto z-50">
      <Menu.Button className="h-full w-auto p-2">
        {user?.profilePicture ? (
          <img
            src={imageSource + user.profilePicture}
            alt="Uni-verse user avatar"
            className="rounded-full object-cover"
            width={42}
            height={42}
            defaultValue="/profile.jpg"
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-grn fa-2xl hover:text-segrn"
          />
        )}
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gry/60 backdrop-blur-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {user && (
          <Menu.Item>
            <div className="group items-center rounded-md px-2 py-2 text-md text-grn">
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
                    ? "bg-grn text-gryf bg-opacity-25 text-md cursor-pointer"
                    : "text-sm text-grn"
                } group items-center px-2 py-2 font-semibold`}
              >
                Dashboard
              </div>
            )}
          </Menu.Item>
        </Link>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active
                  ? "bg-grn text-gryf bg-opacity-25 text-md cursor-pointer"
                  : "text-sm text-grn"
              } group items-center px-2 py-2 font-semibold text-gryf`}
            >
              <ShowRequests isSent={true} />
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active
                  ? "bg-grn bg-opacity-25 text-md cursor-pointer"
                  : "text-sm"
              } group items-center px-2 py-2 font-semibold text-gryf`}
            >
              <ShowRequests isSent={false} />
            </div>
          )}
        </Menu.Item>
        {user.stripeAccountId && (
          <a
            href="https://dashboard.stripe.com/test/dashboard"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active
                      ? "bg-grn bg-opacity-25 text-md cursor-pointer text-gryf"
                      : "text-sm text-grn"
                  } group items-center px-2 py-2 font-semibold border-t-2 border-divide-gray-100`}
                >
                  Earnings
                </div>
              )}
            </Menu.Item>
          </a>
        )}
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
