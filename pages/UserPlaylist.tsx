import React from "react";
import Playlist from "../components/PlayList";

import { useRouter } from "next/router";
import { getSession, GetSessionParams } from "next-auth/react";
import { Session } from "next-auth";
import { adminLogin } from "../api/AdminAPI";
import { ILogin, NotificationType } from "../common/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deletePlaylist, getPlaylistById } from "../api/PlaylistAPI";
import Spinner from "../components/Spinner";
import { Messages } from "../common/constants";
import { notify } from "../components/Notifications";

function UserPlaylist() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { status, data } = useQuery(
    `playlist-${id}`,
    () => getPlaylistById(id).then((res) => res.data),
    { enabled: Boolean(!!id) }
  );

  const { mutate } = useMutation("deletePlaylist", deletePlaylist, {
    onError: (error) => {
      notify("Can not delete playlist", NotificationType.ERROR);
    },
    onSuccess: async (res) => {
      if (res.status !== 200) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "PlayList deleted";
        notify(message, NotificationType.SUCCESS);
        await queryClient.refetchQueries(`playlist-${id}`);
      }
    },
  });

  const onDeletePlaylist = (playlistId: string) => {
    mutate(playlistId);
  };

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="text-start  justify-start items-start w-full h-full ">
        <h1 className="text-xl font-bold not-italic text-grn ml-10 mb-5 mt-16 ">
          Playlist
        </h1>
        <div className="Global bg-grey w-full h-full flex flex-col">
          {status === "loading" ? (
            <div className="flex justify-center items-center mt-10">
              <Spinner />
            </div>
          ) : status === "error" ? (
            <div className="flex justify-center items-center mt-10">
              <h1 className="text-rd whitespace-nowrap">
                {Messages.ERROR_LOAD}
              </h1>
            </div>
          ) : (
            <Playlist
              playlist={data}
              handleClosePlaylistContent="{handleClosePlaylistContent}"
              handleDelete={onDeletePlaylist}
              enableChange="false"
              isPage={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context: GetSessionParams) {
  const session: Session = await getSession(context);
  const payload: ILogin = {
    email: process.env.UNIVERSE_EMAIL,
    password: process.env.UNIVERSE_PASSWORD,
  };
  const adminRefreshToken = await adminLogin(payload).then(
    (response) => response.adminRefreshToken
  );

  if (!session) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      adminRefreshToken,
    },
  };
}

export default UserPlaylist;
