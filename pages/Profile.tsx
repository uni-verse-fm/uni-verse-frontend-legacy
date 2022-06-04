import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImageDisplayer from "../components/UploadImageDisplayer";
import { notify, NotificationType } from "../components/Notifications";
import {
  faPen,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Extensions, Messages } from "../common/constants";
import { useRouter } from "next/router";
import { getUserById } from "../api/UserAPI";

function Profile() {
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

            <h2 className="font-medium not-italic text-gry mt-5 mb-5">
              Password
              <FontAwesomeIcon
                className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                icon={faPen}
              />
            </h2>
            {/*
          <h2 className="font-medium not-italic text-grn mt-5 mb-5">
            Playlists :  
          </h2>
          
<h2 className="font-medium not-italic text-grn mt-5 mb-5">
            Releases :  
          </h2>*/}

            <button className="text-md text-grn border-2 border-grn rounded-full hover:border-white hover:text-white h-8 px-2 mx-2 mt-3">
              <FontAwesomeIcon
                icon={faHandHoldingDollar}
                className="text-grn fa-lg pr-2"
              />
              <span>Donate</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
