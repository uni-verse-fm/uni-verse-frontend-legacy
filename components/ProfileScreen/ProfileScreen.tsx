import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMutation } from "react-query";
import { changeProfilePicture } from "../../api/UserAPI";
import {
  Extensions,
  imageSource,
  MAX_IMAGE_SIZE,
  Messages,
} from "../../common/constants";
import { IProfileScreen, NotificationType } from "../../common/types";
import ArtistReleases from "../ArtistReleases";
import DisplayTracksTable from "../DisplayTracksTable";
import { notify } from "../Notifications";
import Playlists from "../PLaylists";
import UploadImageDisplayer from "../UploadImageDisplayer";
import ResetPasswordModal from "../ResetPasswordModal";

const imageProps = {
  defaultImageSrc: "/profile.jpg",
  size: 56,
  fileExtensions: Extensions.image,
};

let tracks = [
  {
    title: " track N°1",
    author: {
      username: " nmedjoub",
    },
    createdAt: "2022-01-01",
    duration: "2:33",
  },
  {
    title: " track N°2",
    author: {
      username: " nmedjoub",
    },
    createdAt: "2022-01-01",
    duration: "2:33",
  },
  {
    title: " track N°2",
    author: {
      username: " nmedjoub",
    },
    createdAt: "2022-01-01",
    duration: "2:33",
  },
  {
    title: " track N°3",
    author: {
      username: " nmedjoub",
    },
    createdAt: "2022-01-01",
    duration: "2:33",
  },
  {
    title: " track N°4",
    author: {
      username: " nmedjoub",
    },
    createdAt: "2022-01-01",
    duration: "2:33",
  },
];

const ProfileScreen = ({ user, releases, isMe }: IProfileScreen) => {
  const [isValid, setIsValid] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const handleCloseDialog = () => {
    setShowForm(false);
  };
  const handleShowForm = () => {
    setShowForm(true);
  };

  const { mutate } = useMutation("uploadProfilePicture", changeProfilePicture, {
    onError: () => {
      notify(`Can't upload profile picture`, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Profile picture uploaded";
        notify(message, NotificationType.SUCCESS);
      }
    },
  });

  const handleImageUpload = (image: File) => {
    if (image.size > MAX_IMAGE_SIZE) {
      setIsValid(false);
    } else {
      setIsValid(true);
      var bodyFormData = new FormData();
      bodyFormData.append("file", image, image.name);
      mutate(bodyFormData);
    }
  };

  return (
    <div
      className={`bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-20`}
    >
      <div
        className={`text-start flex justify-start flex-col items-center w-full h-full`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center">
            <h1 className="text-2xl font-bold not-italic text-grn m-2">
              {user.username}
            </h1>
            <h2 className="text-lg font-bold not-italic text-wht m-2">
              {user.email}
            </h2>
          </div>
          <UploadImageDisplayer
            {...imageProps}
            profilePicture={
              user.profilePicture
                ? imageSource + user.profilePicture
                : imageProps.defaultImageSrc
            }
            maxFileSize="10"
            setFieldValue={handleImageUpload}
            disable={true}
          />
          {!isValid ? <div className="text-rd">File is too large</div> : null}
          {user.id && isMe && (
            <button
              onClick={handleShowForm}
              className="font-medium text-wht text-md rounded-full border-2 border-grn px-2 h-7 hover:bg-grn hover:bg-opacity-25"
            >
              <span>Password</span>
              <FontAwesomeIcon
                className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                icon={faPen}
              />
            </button>
          )}
          {user.id && user.accountId && (
            <button className="mt-4 text-md text-grn bg-wht rounded-full px-2 h-7 hover:bg-grn hover:text-wht hover:bg-opacity-25">
              <span>Donate</span>
            </button>
          )}
        </div>
      </div>

      <h2 className="font-medium not-italic text-wht text-xl mt-10">
        Populaires :
      </h2>
      {tracks.length ? (
        <DisplayTracksTable tracks={tracks} />
      ) : (
        <div className="flex justify-center items-center mt-5 text-lg">
          <h1 className="text-grn whitespace-nowrap">
            {Messages.EMPTY_TRACKS}
          </h1>
        </div>
      )}

      <div className="text-start justify-start items-start w-full h-full">
        <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-5 ">
          Albums (Releases) :
        </h2>
        <div className="-ml-4 ">
          <ArtistReleases data={releases} />
        </div>

        <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-5 ">
          Playlists :
        </h2>

        <div className="-ml-4 ">
          <Playlists className="w-full" userId={user.id} modalDisplay="false" />
        </div>

        {user.accountId && (
          <div>
            <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-10">
              RessoucesPacks :
            </h2>
            <h2 className="font-bold not-italic text-wht text-xl  ">...</h2>
          </div>
        )}
      </div>
      <ResetPasswordModal
        showModal={showForm}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
};

export default ProfileScreen;
