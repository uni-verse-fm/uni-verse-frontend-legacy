import React from "react";
import Playlist from "../components/PlayList";

import { useRouter } from "next/router"

function Playlists  () {
  const router = useRouter()
  const {
    query: { id },
  } = router
  
  return (
    <div className="bg-drk w-full h-full flex flex-col">
      <div className="text-start flex justify-start flex-col items-start w-full h-full ">
      <h1 className="text-xl font-bold not-italic text-grn ml-10 mb-5 mt-16 ">
          Playlist 
          </h1>
        <Playlist
              index={id}
              handleClosePlaylistContent="{handleClosePlaylistContent}"
            />
      </div>
    </div>
  );
}

export default Playlists;




