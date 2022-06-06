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
} from "@fortawesome/free-solid-svg-icons";
import { Extensions, Messages, urlImage } from "../common/constants";
import { useRouter } from "next/router";
import { getUserById } from "../api/UserAPI";

function MyProfile({ props }) {
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

  /*const { status, data } = useQuery("me", () => me().then((res) => res.data), {
    onSuccess: (res) => {
      if (res.status === 401) {
        notify("get your profile");
      }
    },
  });*/

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
          <div className="mt-20 ml-16">
            <h1 className="text-xl font-bold not-italic text-grn">
              {data.username}
              <FontAwesomeIcon
                className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                icon={faPen}
              />
            </h1>

            <h2 className="font-medium not-italic text-wht mt-5">Email</h2>
            <h2 className="font-medium not-italic text-wht">
              {data.email}
              <FontAwesomeIcon
                className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                icon={faPen}
              />
            </h2>

            <h2 className="font-medium not-italic text-wht mt-5 mb-5">
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

            <h2 className="font-medium not-italic text-wht text-xl mt-10 mb-5">
              Populaires : 
            </h2>

           

            <h2 className="font-medium not-italic text-wht text-xl mt-5 mb-5">
              Albums (Releases & ressoucesPacks) : 
            </h2>

           

            <h2 className="font-medium not-italic text-grn mt-5 mb-5">
              Playlists : 
            </h2>



            <button className="text-md text-grn bg-wht rounded-full px-2 h-8 mt-3">
              <span> Donate </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default MyProfile;
