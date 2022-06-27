import { Menu } from "@headlessui/react";
import { getPlaylists } from "../../api/PlaylistAPI";

import { notify } from "../Notifications";
import { useMutation } from "react-query";
import router from "next/router";
import { Messages } from "../../common/constants";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

import { updatePlaylist } from "../../api/PlaylistAPI";
import {
  IUpdatePayload,
  IUpdatePlaylistTrack,
  NotificationType,
  Pages,
} from "../../common/types";

const MenuSelectPlayList = ({ track }) => {
  const { status, data } = useQuery(
    "playlists",
    () => getPlaylists().then((res) => res.data),
    {
      onSuccess: (res) => {
        if (res.status === 401) {
          notify("Playlists bay from success");
          router.replace(`/${Pages.Login}`);
        }
      },
      onError: (error: AxiosError) => {
        if (error.response.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          router.replace(`/${Pages.Login}`);
        }
      },
    }
  );

  const { mutate } = useMutation("updatePlaylist", updatePlaylist, {
    onError: () => {
      notify("Can not add track to playlist", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "track added to your plalist successfully";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });
  const onClickRelease = (playlist) => () => {
    let dataToUpdate: IUpdatePlaylistTrack = {
      trackId: track._id,
      action: "ADD",
    };

    let dataForm: IUpdatePayload = {
      id: playlist._id,
      data: dataToUpdate,
    };
    mutate(dataForm);
  };

  return (
    <Menu as="div" className="text-left h-full w-auto">
      <Menu.Button className="h-full w-auto">Add to a playlist</Menu.Button>
      <Menu.Items className="absolute hover-text-grn text-blck left-0 mt-2  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {status === "success" &&
          data.map((playlist, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <div
                  onClick={onClickRelease(playlist)}
                  className={`${
                    active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
                  } group items-center px-2 py-2 font-semibold text-gryf`}
                >
                  <button>{playlist.title}</button>
                </div>
              )}
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  );
};

export default MenuSelectPlayList;
