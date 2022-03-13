import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./PlayListsModal.module.css";

const PlaylistsModal = () => {
  // Static data
  const urlImage = "https://i.ibb.co/K984Tcf/Play-List-img.png";
  let playLists = [
    { name: "Rock ", owner: "Naoual MEDJOUB", image: urlImage },
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
  ////// Static data

  const renderCard = (card) => {
    return (
      <div className={styles.card}>
        <div className={styles.card__body}>
          <img className={styles.playlist_image} src={card.image} />
          <h2 className={styles.card__title}> {card.name} </h2>
          <h1 className={styles.card__Owner}> {card.owner} </h1>
        </div>
      </div>
    );
  };

  return (
    <div
      className="Global bg-grey w-full h-full flex flex-col  "
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className={styles.AjoutPlaylist}
        onClick={(_: any) => console.log("NOT IMPLEMENTED")}
      >
        <h2 className="text-gry">
          {" "}
          <FontAwesomeIcon
            className="IconePlus"
            icon={faPlus}
            style={{ marginRight: "10px", color: "black", background: "white" }}
          />{" "}
          Ajouter une playList{" "}
        </h2>
      </div>
      <div className="w-full flex flex-col ml-10 mb-5">
        <h1 className="text-grn"> PlayLists </h1>
      </div>
      <div className={styles.wrapper}>{playLists.map(renderCard)}</div>;
    </div>
  );
};
export default PlaylistsModal;
