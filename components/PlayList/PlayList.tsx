import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock } from "@fortawesome/free-solid-svg-icons";
import PlaylistCard from "../PlayListCard/PLayListCard";
import Image from "next/image";

const Playlist = () => {
  // Static data
  const urlImage = "https://i.ibb.co/K984Tcf/Play-List-img.png";

  let titres = [
    {
      name: "Titre 1",
      artist: "Artist 1",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 2",
      artist: "Artist 4",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 3",
      artist: "Artist 1",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 4",
      artist: "Artist 7",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 5",
      artist: "Artist 1",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 6",
      artist: "Artist 1",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 7",
      artist: "Artist 9",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 8",
      artist: "Artist 1",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 9",
      artist: "Artist 1",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 10",
      artist: "Artist 4",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 11",
      artist: "Artist 3",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
    {
      name: "Titre 12",
      artist: "Artist 4",
      createdate: "09-03-2022",
      duration: "2m:33",
      album: "Par Naoual MEDJOUB",
      image: urlImage,
    },
  ];

  let playList = {
    name: " Ma PlayList N°1 ",
    owner: "Naoual MEDJOUB",
    image: urlImage,
    Titres: titres,
    globalDuration: "32 min 44 s",
  };

  let titreLenght = playList.Titres.length;
  return (
    <div className="Global bg-grey w-full h-full flex flex-col  ">
      <div className="ml-10 ">
        <img className="rounded w-28 h-28 mb-5" src={playList.image} />

        <h2 className="text-wht">
          PlayList N° 1
          <FontAwesomeIcon
            className="cursor-pointer ml-5 hover:scale-[1.40] text-grn"
            icon={faPlay}
          />
        </h2>
        <h2 className="text-gry mb-5">
          {titreLenght} Titres, {playList.globalDuration}
        </h2>
      </div>

      <table className=" ml-10 mr-10 text-gry text-sm ">
        <thead>
          <tr className="text-grn border-b mb-10">
            <td className="py-3"></td>
            <td className="py-3">Name</td>
            <td className="py-3">Album</td>
            <td className="py-3">Creation date</td>
            <td className="py-3">
              <FontAwesomeIcon className="ml-5 text-grn" icon={faClock} />
            </td>
          </tr>
        </thead>
        <tbody>
          {titres.map(function (item) {
            return (
              <tr
                key={item.name}
                className="h-10 cursor-pointer hover:text-wht hover:border-b hover:border-t"
              >
                <td>
                  <FontAwesomeIcon
                    className=" cursor-pointer hover:scale-[1.40] text-grn"
                    icon={faPlay}
                  />
                </td>
                <td>{item.name}</td>
                <td>Album 1</td>
                <td>{item.createdate}</td>
                <td>{item.duration}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Playlist;
