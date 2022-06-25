import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Extensions, Messages } from "../../common/constants";
import { IProfileScreen } from "../../common/types";
import ArtistReleases from "../ArtistReleases";
import DisplayTracksTable from "../DisplayTracksTable";
import { notify } from "../Notifications";
import Playlists from "../PLaylists";
import UploadImageDisplayer from "../UploadImageDisplayer";
import ResetPasswordModal from "../ResetPasswordModal";
import { useState } from "react";

const imageProps = {
  src: undefined,
  defaultImageSrc: "/profile.jpg",
  size: 28,
  fileExtensions: Extensions.image,
  setFieldValue: () => notify(Messages.NOT_IMPLEMENTED),
};

const ProfileScreen = ({ user, releases, isMe }: IProfileScreen) => {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    console.log("setShowForm à true");

    setShowForm(true);
  };
  const handleCloseDialog = () => setShowForm(false);

  {
    /** A remplacer par getPopularTracks */
  }
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

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="text-start flex justify-start flex-col items-start w-full h-full ">
        (
        <div className="mt-10 ml-16">
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <div className="row-span-2 text-center">
              <h1 className="text-xl font-bold not-italic text-grn mb-3">
                {user.username}
              </h1>
              {user.id && isMe && <UploadImageDisplayer {...imageProps} />}
              {user.id && isMe === false && (
                <img
                  src={imageProps.defaultImageSrc}
                  className={`md:mx-auto object-contain h-${
                    imageProps.size || 60
                  } w-${imageProps.size || 60} rounded-lg`}
                  alt="image to upload"
                />
              )}
            </div>
            <div className="col-start-2 col-end-3 self-end">
              <h2 className="font-medium not-italic text-wht">{user.email}</h2>
            </div>
            {user.id && isMe && (
              <div className="col-start-2 col-end-3">
                <button
                  onClick={handleShowForm}
                  className="font-medium text-wht rounded-full border-2 border-grn px-2 text-md h-7 hover:bg-grn hover:bg-opacity-25"
                >
                  <span>Password</span>
                  <FontAwesomeIcon
                    className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                    icon={faPen}
                  />
                </button>
                <br></br>
              </div>
            )}
          </div>
        </div>
        )
      </div>
      {user.id && isMe && (
        <div className="col-start-2 col-end-3 self-start mt-8 mb-4 ml-16">
          <button className="mt-4 text-md text-grn bg-wht rounded-full px-2 h-7 hover:bg-grn hover:text-wht hover:bg-opacity-25">
            <span>Donate</span>
          </button>
        </div>
      )}

      <h2 className="font-medium not-italic text-wht text-xl mt-10 ml-16">
        Populaires :
      </h2>
      {tracks.length ? (
        <DisplayTracksTable tracks={tracks} releaseTitle={""} />
      ) : (
        <div className="flex justify-center items-center mt-5 text-lg">
          <h1 className="text-grn whitespace-nowrap">
            {Messages.EMPTY_TRACKS}
          </h1>
        </div>
      )}

      <div className="text-start justify-start items-start w-full h-full ml-16 ">
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
        <ResetPasswordModal
          showModal={showForm}
          handleCloseDialog={handleCloseDialog}
        />
      </div>
    </div>
  );
};

export default ProfileScreen;
