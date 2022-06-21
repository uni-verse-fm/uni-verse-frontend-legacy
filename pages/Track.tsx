import React from "react";
import { useRouter } from "next/router";
import ArtistTrack from "../components/ArtistTrack/ArtistTrack";
import Comments from "../components/Comments";

function Track() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="text-start  justify-start items-start w-full h-full ">
        <h1 className="text-xl font-bold not-italic text-grn ml-10 mb-5 mt-16 ">
          Track
        </h1>
        <ArtistTrack
          index={id}
          handleClosePlaylistContent="{handleClosePlaylistContent}"
          enableChange="false"
        />
        <Comments
          idTrack={id}
        />


      </div>
    </div>
  );
}

export default Track;
