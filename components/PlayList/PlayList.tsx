import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClock } from "@fortawesome/free-solid-svg-icons";
import { getPlaylistById } from "../../api/PlaylistAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { Messages, urlImage } from "../../common/constants";
import Image from "next/image";

const Playlist = ({ index }) => {
  const { status, data } = useQuery("playlist", () =>
    getPlaylistById(index).then((res) => res.data)
  );

  return (
    <div className="Global bg-grey w-full h-full flex flex-col  ">
      {status === "loading" ? (
        <div className="flex justify-center items-center mt-10">
          <Spinner />
        </div>
      ) : status === "error" ? (
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
        </div>
      ) : (
        <>
          <div className="ml-10 ">
            <Image
              className="rounded mb-5"
              src={data.image || urlImage}
              width={150}
              height={150}
            />

            <h2 className="text-wht">
              {data.title}
              <FontAwesomeIcon
                className="cursor-pointer ml-5 hover:scale-[1.40] text-grn"
                icon={faPlay}
              />
            </h2>
            <h2 className="text-gry mb-5"></h2>
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
              {data.tracks.map((item) => (
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
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
export default Playlist;
