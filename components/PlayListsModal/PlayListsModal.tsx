import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PlaylistCard from "../PlayListCard/PLayListCard";
import styles from "./PlayListsModal.module.css";

const PlaylistsModal = () => {
  // Static data
  const urlImage = "https://i.ibb.co/K984Tcf/Play-List-img.png";
  let playLists = [
    { name: " Ma PlayList N°1 ", owner: "Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°1", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°2", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°3", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°4", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°5", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°6", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°7", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°4", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°5", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°6", owner: "Par Naoual MEDJOUB", image: urlImage },
    { name: " Ma PlayList N°7", owner: "Par Naoual MEDJOUB", image: urlImage },
  ];

  return (
    <div className="Global bg-grey w-full h-full flex flex-col  ">
      <div
        className="ml-10 mb-10 cursor-pointer"
        onClick={(_: any) => console.log("NOT IMPLEMENTED")}
      >
        <h2 className="text-gry hover:text-wht">
          <FontAwesomeIcon
            className="hover:text-black mr-4 text-black bg-wht"
            icon={faPlus}
          />
          Ajouter une playList
        </h2>
      </div>
      <div className="w-full flex flex-col ml-10 mb-5">
        <h1 className="text-grn"> PlayLists </h1>
      </div>
      <div className={styles.wrapper}>
        {playLists.map(function (item) {
          return (
            <PlaylistCard
              key={item}
              name={item.name}
              image={item.image}
              owner={item.owner}
            />
          );
        })}
      </div>
    </div>
  );
};
export default PlaylistsModal;
