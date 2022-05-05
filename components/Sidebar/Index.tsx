import { useEffect, useState } from "react";
import {
  faHome,
  faList,
  faRecordVinyl,
  faFileWaveform,
  faXmark,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import SideMenuEntry from "./SideMenuEntry";
import Player from "../Player/Index";
import Image from "next/image";
import PlaylistsModal from "../PlayListsModal/PlayListsModal";
import Playlist from "../PlayList/PlayList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export enum Pages {
    Home = " ",
    UploadRelease = "UploadRelease",
    UploadResourcePack = "UploadResourcePack"
}

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  {
    /** PlayLists Modal handle*/
  }
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <div className="w-64 absolute sm:relative bg-gry md:h-screen flex-col hidden sm:flex">
        <div className="flex flex-row h-16">
          <div className="inline-block h-12 w-12 ml-2 mt-auto mb-auto overflow-hidden rounded-full ring-2 ring-grn">
            <Image
              src="https://picsum.photos/200/300"
              alt="Uni-verse user avatar"
              width={48}
              height={48}
            />
          </div>
          <h1 className="text-grn mr-auto mt-auto mb-auto ml-5">Uni-verse</h1>
        </div>
        <div className="mt-6 flex flex-col">
          <SideMenuEntry
            icon={faHome}
            onClick={(_: any) => console.log("NOT IMPLEMENTED")}
            pageName={Pages.Home}
            title="Home"
          />
          <SideMenuEntry
            icon={faList}
            onClick={handleShowModal}
            title="Playlists"
            nbNotif={8}
          />
          <SideMenuEntry
            icon={faRecordVinyl}
            onClick={(_: any) => console.log("NOT IMPLEMENTED")}
            pageName={Pages.UploadRelease}
            title="Upload release"
          />
          <SideMenuEntry
            icon={faFileWaveform}
            onClick={(_: any) => console.log("NOT IMPLEMENTED")}
            pageName={Pages.UploadResourcePack}
            title="Upload sample or preset"
          />
          <SideMenuEntry
            icon={faChartLine}
            onClick={(_: any) => console.log("NOT IMPLEMENTED")}
            title="Analytics"
          />
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
        <div className="px-8">
          <div className="h-16 w-full flex items-center">
            <div className="flex flex-row h-16">
              <div className="inline-block h-12 w-12 mt-auto mb-auto mr-auto ml-2 overflow-hidden rounded-full ring-2 ring-white">
                <Image
                  src="https://picsum.photos/200/300"
                  alt="Uni-verse user avatar"
                  width={48}
                  height={48}
                />
              </div>
              <h1 className="text-white mr-auto mt-auto mb-auto ml-5">
                Uni-verse
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/** PlayLists Modal */}
      {showModal && (
        <div className="ModalPlayLists">
          <button
            style={{ float: "right", marginRight: "2%", marginTop: "1%" }}
            onClick={handleCloseModal}
          >
            {" "}
            <FontAwesomeIcon
              icon={faXmark}
              style={{ color: "#1BC47D", background: "black" }}
            />
          </button>
          <PlaylistsModal />
        </div>
      )}
    </>
  );
};
export default Sidebar;
