import React from "react";

const PlaylistCard = (props) => {
  return (
    <div className="cursor-pointer hover:scale-[1.03] mb-1">
      <img
        className=" md:container md:mx-auto rounded w-full h-28"
        src={"/Playlist.png"}
      />
      <h2 className="pt-1 pl-1 pb-2 text-segrn text-md"> {props.title} </h2>
      <h1 className="pl-1 text-gry text-sm "> {props.title} </h1>
    </div>
  );
};
export default PlaylistCard;
