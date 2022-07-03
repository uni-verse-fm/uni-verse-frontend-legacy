import React from "react";
import { useRouter } from "next/router";
import { Resource as IResource, ModelType } from "../common/types";
import Comments from "../components/Comments";
import ArtistResource from "../components/ArtistResource";

function Resource() {
  const router = useRouter();

  const {
    query: { resource },
  } = router;

  const parse = (resource: string | string[]): IResource | undefined =>
    resource && JSON.parse(resource as string);

  return (
    <div className="bg-drk w-auto h-full overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-col items-center justify-start h-full p-10">
        <div>
          <ArtistResource resource={parse(resource)} />
          <Comments
            idTrack={parse(resource)?.id}
            typeOfContent={ModelType.Resource}
          />
        </div>
      </div>
    </div>
  );
}

export default Resource;
