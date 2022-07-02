import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import MenuSelectPlaylist from "./MenuSelectPlaylist";
import { Pages } from "../../common/types";

const ShowMoreMenu = ({ track }) => {
  const onClickDisplayUser = () => {
    router.push({
      pathname: `/${Pages.Profile}`,
      query: { id: track.author._id },
    });
  };

  return (
    <Menu as="div" className="relative text-left h-full w-auto">
      <Menu.Button className="h-full w-auto p-2">
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-[1.40] hover:text-grn text-grn"
          icon={faEllipsis}
        />
      </Menu.Button>
      <Menu.Items className="bg-wht bg-opacity-80 z-10 absolute w-auto h-auto divide-y divide-gray-100 rounded-md">
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center px-2 py-2 text-gryf rounded-t-md`}
            >
              <MenuSelectPlaylist track={track} />
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ?  "bg-grn bg-opacity-25 text-md": "text-sm"
              } group items-center px-2 py-2 rounded-b-md text-black font-medium`}
            >
              <button
                className="text-black font-medium"
                onClick={onClickDisplayUser}
              >
                Artist
              </button>
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
export default ShowMoreMenu;
