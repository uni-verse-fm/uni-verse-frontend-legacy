import { Messages, Pages } from "../../common/constants";
import { useState } from "react";
import {
  faHome,
  faList,
  faRecordVinyl,
  faFileWaveform,
  faXmark,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import SideMenuEntry from "./SideMenuEntry";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationType, notify } from "../Notifications";
import Player from "../Player";
import PlaylistsModal from "../PlayListsModal";

const Sidebar = ({ isConnected,  handleShowModal}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="w-64 absolute sm:relative bg-gry md:h-screen flex-col hidden sm:flex">
        <div className="flex flex-row h-16">
          <div className="inline-block h-16 w-16 ml-2 mt-auto mb-auto overflow-hidden rounded-full">
            <Image
              src="/universe.svg"
              className="hover:motion-safe:animate-spin"
              alt="Uni-verse user avatar"
              width={70}
              height={70}
            />
          </div>
          <h1 className="text-grn mr-auto mt-auto mb-auto ml-2 decoration-solid">
            uni-verse
          </h1>
        </div>
        <div className="mt-6 flex flex-col">
          <SideMenuEntry
            icon={faHome}
            onClick={(_: any) =>
              notify(Messages.NOT_IMPLEMENTED, NotificationType.ERROR)
            }
            pageName={Pages.Home}
            title="Home"
          />
          {isConnected && (
            <>
              <SideMenuEntry
                icon={faList}
                onClick={handleShowModal}
                title="Playlists"
                nbNotif={8}
              />
              <SideMenuEntry
                icon={faRecordVinyl}
                pageName={Pages.UploadRelease}
                title="Upload release"
              />
              <SideMenuEntry
                icon={faFileWaveform}
                onClick={(_: any) =>
                  notify(Messages.NOT_IMPLEMENTED, NotificationType.ERROR)
                }
                pageName={Pages.UploadResourcePack}
                title="Upload sample or preset"
              />
              <SideMenuEntry
                icon={faChartLine}
                onClick={(_: any) =>
                  notify(Messages.NOT_IMPLEMENTED, NotificationType.ERROR)
                }
                title="Analytics"
              />
            </>
          )}
        </div>
        <Player className="mt-auto" />
      </div>
      <div
        className={`w-64 z-40 h-screen absolute bg-gray-800 shadow flex-col sm:hidden transition duration-150 ease-in-out ${
          isSidebarOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        }`}
        id="mobile-nav"
      >
        <button
          aria-label="toggle sidebar"
          id="openSideBar"
          className={`${
            isSidebarOpen && "hidden"
          } h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}
          onClick={(_) => setSidebarOpen(true)}
        >
          <Image
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg7.svg"
            alt="toggler"
            layout="fill"
          />
        </button>
        <button
          aria-label="Close sidebar"
          id="closeSideBar"
          className={`${
            !isSidebarOpen && "hidden"
          } h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-br justify-center cursor-pointer text-white`}
          onClick={(_) => setSidebarOpen(false)}
        >
          <Image
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg8.svg"
            alt="cross"
            layout="fill"
          />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
