import React from "react";
import LoginForm from "../components/LoginForm";
import { useQuery } from "react-query";
import { me } from "../api/AuthAPI";
import Spinner from "../components/Spinner";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImageDisplayer from "../components/UploadImageDisplayer";
import { notify, NotificationType } from "../components/Notifications";
import {
  faTrashCan,
  faPen,
  faHandHoldingDollar,
  faClock,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { Extensions, Messages, urlImage } from "../common/constants";
import { useRouter } from "next/router";
import { getUserById } from "../api/UserAPI";
import ArtistReleases from "../components/ArtistReleases";
import Playlists from "../components/PLaylists";

function Profile({ props }) {
  let tracks = [
    {
      name: " track N°1",
      Album: " Album 1",
      createdate: "22-10-2022",
      duration: "2:33",
    },
    {
      name: " track N°2",
      Album: " Album 2",
      createdate: "22-10-2022",
      duration: "2:33",
    },
    {
      name: " track N°2",
      Album: " Album 3",
      createdate: "22-10-2022",
      duration: "2:33",
    },
    {
      name: " track N°3",
      Album: " Album 4",
      createdate: "22-10-2022",
      duration: "2:33",
    },
    {
      name: " track N°4",
      Album: " Album 15",
      createdate: "22-10-2022",
      duration: "2:33",
    },
  ];

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const imageProps = {
    src: undefined,
    defaultImageSrc: "https://i.ibb.co/CQ0sg7L/pxlprostudio190106201.jpg",
    size: 100,
    fileExtensions: Extensions.image,
    setFieldValue: () => notify(Messages.NOT_IMPLEMENTED),
  };

  const { status, data } = useQuery("user", () =>
    getUserById(id).then((res) => {
      console.log("PlayListSelected");
      return res.data;
    })
  );

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="text-start flex justify-start flex-col items-start">
        {status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : (
          <div className="mt-20 ml-16">
            <div className=" flex flex-row ">
              <h1 className="text-xl font-bold not-italic text-grn mr-10">
                {data.username}
              </h1>
              <button className="text-md text-grn bg-wht rounded-full px-2 h-8">
                <span> Donate </span>
              </button>
            </div>

            <h2 className="font-bold not-italic text-wht text-xl mt-10 ">
              Populaires :
            </h2>
          </div>
        )}
      </div>

      {tracks.length ? (
        <table className=" ml-16 mr-10 text-gry text-sm mb-5 mt-2 ">
          <thead>
            <tr className="text-grn border-b mb-10">
              <td className="py-3 "></td>
              <td className="py-3 ">Name</td>
              <td className="py-3 ">Album</td>
              <td className="py-3">Creation date</td>
              <td className="py-3">
                <FontAwesomeIcon className="ml-5 text-grn" icon={faClock} />
              </td>
            </tr>
          </thead>
          <tbody>
            {tracks.map((item) => (
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
      ) : (
        <div className="flex justify-center items-center mt-10 text-lg">
          <h1 className="text-grn whitespace-nowrap">
            {Messages.EMPTY_PLAYLIST}
          </h1>
        </div>
      )}

      <div className="text-start justify-start items-start w-full h-full ml-16 ">
        <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-5 ">
          Albums (Releases) :
        </h2>
        <div className="-ml-4 ">
          <ArtistReleases />
        </div>

        <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-5 ">
          Playlists :
        </h2>

        <div className="-ml-4 ">
          <Playlists className="w-full" id_user={id} modalDisplay="false" />
        </div>

        <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-10  ">
          RessoucesPacks :
        </h2>
        <h2 className="font-bold not-italic text-wht text-xl  ">...</h2>
      </div>
    </div>
  );
}
export default Profile;
