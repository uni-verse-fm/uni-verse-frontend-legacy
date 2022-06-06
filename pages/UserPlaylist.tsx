import React from "react";
import Playlist from "../components/PlayList";

import { useRouter } from "next/router";

function UserPlaylist() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="text-start  justify-start items-start w-full h-full ">
        <h1 className="text-xl font-bold not-italic text-grn ml-10 mb-5 mt-16 ">
          Playlist
        </h1>
        <Playlist
          index={id}
          handleClosePlaylistContent="{handleClosePlaylistContent}"
          enableChange="false"
        />
      </div>
    </div>
  );
}

export default UserPlaylist;
