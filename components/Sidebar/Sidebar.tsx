import { Messages, Pages } from "../../common/constants";
import { useContext, useState } from "react";
import {
  faHome,
  faList,
  faRecordVinyl,
  faFileWaveform,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import SideMenuEntry from "./SideMenuEntry";
import { NotificationType, notify } from "../Notifications";
import Player from "../Player";
import useConnect from "../../common/providers/ConnectProvider";
import { getReleaseById } from "../../api/ReleaseAPI";
import { useQuery } from "react-query";
import { PlayerContext } from "../../common/providers/PlayerProvider";
import { AxiosError } from "axios";
import { UniVerseError } from "../UploadReleaseForm/UploadReleaseForm";
import { Types } from "../../common/reducers/player-reducer";

const releaseExample = "6290280ed7c7f7dedd333b8d";

const Sidebar = ({ handleShowModal }) => {
  // this is an example that should be removed
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { state, dispatch } = useContext(PlayerContext);
  const [connect] = useConnect();
  const { status, data } = useQuery(
    "release",
    () => getReleaseById(releaseExample).then((res) => res.data),
    {
      onError: (error: AxiosError) => {
        const errorMessage: UniVerseError = error.response.data;
        notify(
          `Can't upload release: ${errorMessage.message}`,
          NotificationType.ERROR
        );
      },
      onSuccess: (res) => {
        if (!res) {
          notify("can't read you music", NotificationType.ERROR);
        } else {
          dispatch({
            type: Types.ReleasePlay,
            payload: {
              tracks: res?.tracks || [],
              className: "mt-auto",
              trackIndex: 0
            },
          });
        }
      },
    }
  );

  return (
    <>
      <div className="w-64 sm:relative bg-gry flex-col hidden sm:flex">
        <div className="mt-6 flex flex-col">
          <SideMenuEntry
            icon={faHome}
            onClick={(_: any) =>
              notify(Messages.NOT_IMPLEMENTED, NotificationType.ERROR)
            }
            pageName={Pages.Home}
            title="Home"
          />
          {connect && (
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
        <Player
        //   className="mt-auto"
        //   tracksList={status === "success" && data.tracks}
        //   trackIndex={0}
        />
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
