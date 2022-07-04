import React from "react";

import { imageSource } from "../../common/constants";

const ResourcePackCard = ({ resourcePack }) => {
  return (
    <div className="cursor-pointer rounded-lg hover:scale-[1.03] mb-1 p-2 bg-opacity-50 bg-gry hover:bg-gry hover:bg-opacity-70">
      <img
        className="md:container md:mx-auto rounded-lg w-full h-28"
        src={
          resourcePack.coverName
            ? imageSource + resourcePack.coverName
            : "/Playlist.png"
        }
        alt="resource packs"
      />
      <h2 className="pt-1 pl-1 pb-2 text-segrn text-md">
        {" "}
        {resourcePack.title}{" "}
      </h2>
      <h1 className="pl-1 text-gry text-sm ">
        {resourcePack.author?.username}
      </h1>
    </div>
  );
};
export default ResourcePackCard;
