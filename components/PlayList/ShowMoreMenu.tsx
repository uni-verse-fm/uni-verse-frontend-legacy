import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { notify } from "../Notifications";
import { useMutation } from "react-query";
import { updatePlaylist } from "../../api/PlaylistAPI";
import { useSession } from "next-auth/react";
import {
  IUpdatePayload,
  IUpdatePlaylistTrack,
  NotificationType,
} from "../../common/types";
import router from "next/router";
import { Pages } from "../../common/types";

const ShowMoreMenu = ({ track, playlist, isPage }) => {
  const { data: session } = useSession();

  const { mutate } = useMutation("updatePlaylist", updatePlaylist, {
    onError: () => {
      notify("Can not remove track from playlist", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Track removed from your plalist successfully";
        notify(message, NotificationType.SUCCESS);
        refresh();
      }
    },
  });

  const onClickDisplayUser = () => {
    router.push({
      pathname: `/${Pages.Profile}`,
      query: { id: track.author._id },
    });
  };

  const onClickDisplayTrack = () => {
    router.push({
      pathname: `/${Pages.Track}`,
      query: { track: JSON.stringify(track) },
    });
  };
  const refresh = () => {
    if (isPage) router.reload();
  };

  return (
    <Menu as="div" className="relative text-left h-full w-auto">
      <Menu.Button className="h-full w-auto p-2">
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-[1.40] text-grn"
          icon={faEllipsis}
        />
      </Menu.Button>
      <Menu.Items className="hover-text-grn text-blck absolute right mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {session && (
          <div>
            {(session.user as any).id === playlist.owner?._id && (
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
                    } group items-center px-2 py-2 font-semibold text-gryf`}
                    onClick={(_: any) => {
                      let dataToUpdate: IUpdatePlaylistTrack = {
                        trackId: track.id,
                        action: "REMOVE",
                      };
                      let dataForm: IUpdatePayload = {
                        id: playlist._id,
                        data: dataToUpdate,
                      };
                      mutate(dataForm);
                    }}
                  >
                    <button>Remove</button>
                  </div>
                )}
              </Menu.Item>
            )}
          </div>
        )}
        {isPage && (
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
        )}
      </Menu.Items>
    </Menu>
  );
};

export default ShowMoreMenu;
