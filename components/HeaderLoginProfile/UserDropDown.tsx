import Image from "next/image";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import useConnect from "../../common/providers/ConnectProvider";

const UserDropDown = ({ user }) => {
  const [connected, setConnected] = useConnect();

  const handleLogout = () => {
    setConnected(false);
  };
  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt="Uni-verse user avatar"
              width={60}
              height={60}
            />
          ) : (
            <div className="text-grn m-auto justify-center">
              <FontAwesomeIcon icon={faCircleUser} className="fa-3x" />
            </div>
          )}
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          <div className="group items-center rounded-md px-2 py-2 text-md">
            <div>{user.username}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ? " bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center rounded-md px-2 py-2 font-semibold text-gryf`}
            >
              <Link href="/"> Dashboard </Link>
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ? " bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center rounded-md px-2 py-2 font-semibold text-gryf`}
            >
              <Link href="/"> Settings </Link>
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ? " bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center rounded-md px-2 py-2 font-semibold text-gry`}
            >
              <Link href="/"> Earnings</Link>
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ? " bg-serd text-md" : "text-sm bg-rd"
              } group items-center rounded-md px-2 py-2 text-wht font-semibold text-wht`}
              onClick={handleLogout}
            >
              <Link href="/"> Sign out</Link>
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default UserDropDown;
