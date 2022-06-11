import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faHandHoldingDollar,
  faClock,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { Messages } from "../common/constants";
import { useRouter } from "next/router";
import { getUserById } from "../api/UserAPI";

function Profile() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

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

  const { status, data } = useQuery("user", () =>
    getUserById(id).then((res) => {
      console.log("PlayListSelected");
      return res.data;
    })
  );

  return (
    <div className="bg-drk w-full h-full flex flex-col">
      <div className="text-start flex justify-start flex-col items-start w-full h-full ">
        {status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : (
          <div className="mt-6 ml-16">
            <h1 className="text-xl font-bold not-italic text-grn ">
              {data.username}
              <FontAwesomeIcon
                className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                icon={faPen}
              />
            </h1>

            <h2 className="font-medium not-italic text-gry mt-5">Email</h2>
            <h2 className="font-medium not-italic text-wht">
              {data.email}
              <FontAwesomeIcon
                className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                icon={faPen}
              />
            </h2>
          </div>
        )}
      </div>

      {tracks.length ? (
        <table className="ml-16 mr-10 text-gry text-sm mb-5 mt-2 ">
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
      <div>
        <h2 className="font-medium not-italic text-gry mt-5 mb-5">
          Password
          <FontAwesomeIcon
            className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
            icon={faPen}
          />
        </h2>
        <button className="text-md text-grn border-2 border-grn rounded-full hover:border-white hover:text-white h-8 px-2 mx-2 mt-3">
          <FontAwesomeIcon
            icon={faHandHoldingDollar}
            className="text-grn fa-lg pr-2"
          />
          <span>Donate</span>
        </button>
      </div>
    </div>
  );
}
export default Profile;
