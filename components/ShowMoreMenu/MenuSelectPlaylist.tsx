import { Menu } from "@headlessui/react";
import { getUserPlaylists } from "../../api/PlaylistAPI";

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
import { useSession } from "next-auth/react";



const MenuSelectPlayList = ({ track }) => {
  const { data: session } = useSession();

  const { status, data } = useQuery(
    "my-playlists",
    () => getUserPlaylists((session?.user as any).id),
    {
      onError: (error: AxiosError) => {
        if (error.response?.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          router.replace(`/${Pages.Login}`);
        }
      },
      enabled: Boolean((session?.user as any).id),
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
      trackId: track.id,
      action: "ADD",
    };

    let dataForm: IUpdatePayload = {
      id: playlist._id,
      data: dataToUpdate,
    };

    mutate(dataForm);
  };

  return (
    <Menu as="div" className="relative text-left h-full w-auto">
      <Menu.Button className="h-full text-left font-medium text-blk w-auto">
        Add to a playlist
      </Menu.Button>
      <Menu.Items className="absolute hover-text-grn text-black mt-2 divide-y divide-gray-100 rounded-md bg-wht">
        {status === "success" &&
          data.map((playlist, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <div
                  onClick={onClickRelease(playlist)}
                  className={`${
                    active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
                  } group items-center px-2 py-2 font-semibold`}
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
