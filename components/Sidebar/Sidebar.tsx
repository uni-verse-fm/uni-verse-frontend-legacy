import { Messages } from "../../common/constants";
import { useState } from "react";
import {
  faHome,
  faList,
  faRecordVinyl,
  faFileWaveform,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import SideMenuEntry from "./SideMenuEntry";
import { notify } from "../Notifications";
import Player from "../Player";
import { useSession } from "next-auth/react";
import { NotificationType, Pages } from "../../common/types";
import Link from "next/link";

const Sidebar = ({ handleShowModal }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <div className="w-64 sm:relative bg-gry flex-col hidden sm:flex">
        <div className="mt-6 flex flex-col">
          <Link href={`/${Pages.Home}`} passHref>
            <SideMenuEntry icon={faHome} title="Home" />
          </Link>

          {!!session && (
            <>
              <SideMenuEntry
                icon={faList}
                onClick={handleShowModal}
                title="Playlists"
              />

              <Link href={`/${Pages.UploadRelease}`} passHref>
                <SideMenuEntry icon={faRecordVinyl} title="Upload release" />
              </Link>
              <Link href={`/${Pages.UploadResourcePack}`} passHref>
                <SideMenuEntry
                  icon={faFileWaveform}
                  title="Upload sample or preset"
                />
              </Link>

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
        <Player />
      </div>
      {/* <div
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
      </div> */}
    </>
  );
};

export default Sidebar;
