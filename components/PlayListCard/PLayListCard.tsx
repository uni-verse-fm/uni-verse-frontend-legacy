import React from "react";

const PlaylistCard = (props) => {
  return (
    <div className="cursor-pointer hover:scale-[1.03]">
      <img
        className=" md:container md:mx-auto rounded w-full h-28"
        src={props.image}
      />
      <h2 className="pt-1 pl-1 pb-2 text-grn text-xs"> {props.name} </h2>
      <h1 className="pl-1 text-gry text-xs "> {props.owner} </h1>
    </div>
  );
};
export default PlaylistCard;
