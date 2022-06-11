import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";

import { Pages } from "../../common/constants";

import MenuSelectPlaylist from "./MenuSelectPlaylist";

const ShowMoreMenu = ({ track }) => {
  const onClickDisplayUser = () => {
    router.push({
      pathname: `/${Pages.Profile}`,
      query: { id: track.author._id },
    });
  };

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
            <div
              className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center px-2 py-2 font-semibold text-gryf`}
            >
              <MenuSelectPlaylist track={track} />
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center px-2 py-2 font-semibold text-gryf`}
            >
              <button onClick={onClickDisplayUser}>Artist</button>
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
export default ShowMoreMenu;
