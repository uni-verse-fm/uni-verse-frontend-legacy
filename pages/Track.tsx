import React from "react";
import { useRouter } from "next/router";
import ArtistTrack from "../components/ArtistTrack";
import { Track as ITrack, ModelType } from "../common/types";
import Comments from "../components/Comments";

function Track() {
  const router = useRouter();

  const {
    query: { track },
  } = router;

  const parse = (track: string | string[]): ITrack | undefined =>
    track && JSON.parse(track as string);

  return (
    <div className="bg-drk w-auto h-full overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-col items-center justify-start h-full p-10">
        <div>
          <ArtistTrack track={parse(track)} />
          <Comments idTrack={parse(track)?.id} typeOfContent= {ModelType.Track} />
        </div>
      </div>
    </div>
  );
}

export default Track;
