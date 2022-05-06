import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./PlayListsModal.module.css";
import { Messages } from "../common/constants";
import { notify } from "../Notifications";
import PlaylistCard from "../PlayListCard";
import Playlist from "../PlayList";

const PlaylistsModal = () => {
  {
    /** PlayLists Modal handle*/
  }
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
    <div className="Global bg-grey w-full h-full flex flex-col z-50">
      <div
        className="ml-10 mb-10 cursor-pointer"
        onClick={(_: any) => notify(Messages.NOT_IMPLEMENTED)}
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

      <div className={styles.wrapper} onClick={handleShowModal}>
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
      {/** PlayLists Modal */}
      {showModal && (
        <div className="ModalPlayLists2">
          <button
            style={{
              float: "left",
              marginLeft: "2%",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            onClick={handleCloseModal}
          >
            {" "}
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ color: "#1BC47D", background: "black" }}
            />
          </button>
          <Playlist />
        </div>
      )}
    </div>
  );
};
export default PlaylistsModal;
