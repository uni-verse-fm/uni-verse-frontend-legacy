import Image from "next/image";
import { Menu } from "@headlessui/react";
import { getPlaylists } from "../../api/PlaylistAPI";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faEllipsis } from "@fortawesome/free-solid-svg-icons";
import useConnect from "../../common/providers/ConnectProvider";
import { logout } from "../../api/AuthAPI";
import { NotificationType, notify } from "../Notifications";
import { useMutation } from "react-query";
import router from "next/router";
import { Messages } from "../../common/constants";
import { Pages } from "../../common/constants";
import PlaylistCard from "../PlayListCard";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { styles } from "../PlayListsModal";
import { IUpdatePayload } from "../UpdatePlaylistForm/UpdatePlaylistForm";

import { updatePlaylist } from "../../api/PlaylistAPI";


export interface IUpdatePlaylistTrack {
  trackId: string;
  action: string;
 
}



const MenuSelectPlayList = ({ track }) => {
  /*

  const clientDisconnect = () =>
    (document.cookie = "Authentication=; Max-Age=0;secure; path=/;");

  const { mutate, isLoading } = useMutation("logout", logout, {
    onError: (error) => {
      notify("Your session will expire" + error, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 200) {
        notify("Disconnected", NotificationType.ERROR);
      } else {
        notify(Messages.DISCONNECTED, NotificationType.SUCCESS);
      }
    },
  });
  const handleLogout = () => {
    mutate();
    setConnect(false);
    router.replace("/");
    clientDisconnect();
  };*/



  const [connect, setConnect] = useConnect();
  const { status, data } = useQuery(
    "playlists",
    () => getPlaylists().then((res) => res.data),
    {
      onSuccess: (res) => {
        if (res.status === 401) {
          notify("Playlists bay from success");
          setConnect(false);
          router.replace(`/${Pages.Login}`);
        }
      },
      onError: (error: AxiosError) => {
        if (error.response.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          setConnect(false);
          router.replace(`/${Pages.Login}`);
        }
      },
    }
  );


  const { mutate, isLoading } = useMutation("updatePlaylist", updatePlaylist, {
    onError: (error) => {
      notify("there was an error" + error, NotificationType.ERROR);
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

  return (
    <Menu as="div" className="text-left h-full w-auto">
      <Menu.Button className="h-full w-auto"  >
                  Add to a playlist
      </Menu.Button>


      { /*.map(fruit => <MenuItem key={fruit}>{fruit}</MenuItem>)} */ }
      
      <Menu.Items className="hover-text-grn text-blck absolute left-0 mt-2  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

      {status === "success" &&
                data.map((playlist, index) => (
                  <Menu.Item key={index}> 
                  {({ active }) => (
                    <div className={`${
                        active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
                      } group items-center px-2 py-2 font-semibold text-gryf`}>
                        {/* Un autre menu ici */ }
                        <button
                         onClick={(_: any) => {
                
                            let dataToUpdate: IUpdatePlaylistTrack = {
                              trackId: track._id,
                              action: "ADD",
                             
                            };
                
                            let dataForm: IUpdatePayload = {
                              id: playlist._id,
                              data: dataToUpdate,
                            };
                
                            
                            mutate(dataForm);
                          }
                        }>
                          {playlist.title}
                        </button>
                    </div>)}
                  </Menu.Item>
                ))}


          <Menu.Item>
          {({ active }) => (
            <div className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center px-2 py-2 font-semibold text-gryf`}>
                {/* Un autre menu ici */ }
                <button
                 onClick={(_: any) =>
                  notify(Messages.NOT_IMPLEMENTED, NotificationType.ERROR)
                }>
                  PlayList 1
                </button>
            </div>)}
          </Menu.Item>
          <Menu.Item>
          {({ active }) => (
            <div className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group items-center px-2 py-2 font-semibold text-gryf`}>
                <button
                 onClick={(_: any) =>
                  notify(Messages.NOT_IMPLEMENTED, NotificationType.ERROR)
                }>
                   PlayList 2
                </button>
            </div>)}
          </Menu.Item>
   
      
        
     
       
      </Menu.Items>
    </Menu>
  );
};

export default MenuSelectPlayList;
