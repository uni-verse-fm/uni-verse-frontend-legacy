import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Extensions, Messages } from "../../common/constants";
import { IProfileScreen } from "../../common/types";
import ArtistReleases from "../ArtistReleases";
import DisplayTracksTable from "../DisplayTracksTable";
import { notify } from "../Notifications";
import Playlists from "../PLaylists";
import UploadImageDisplayer from "../UploadImageDisplayer";

const imageProps = {
  src: undefined,
  defaultImageSrc: "/profile.jpg",
  size: 28,
  fileExtensions: Extensions.image,
  setFieldValue: () => notify(Messages.NOT_IMPLEMENTED),
};


const ProfileScreen = ({ user, releases, isMe }: IProfileScreen) => {
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
              <h1 className="text-xl font-bold not-italic text-grn">
                {user.username}
              </h1>
              <UploadImageDisplayer {...imageProps} />
            </div>

            <div className="col-start-2 col-end-3 self-end">
              <h2 className="font-medium not-italic text-wht mt-1">
                {user.email}
              </h2>
            </div>

            <div className="col-start-2 col-end-3">
              <button className="font-medium text-wht mt-10 rounded-full border-2 border-grn px-2 text-md h-7 hover:bg-grn hover:bg-opacity-25">
                <span>Password</span>
                <FontAwesomeIcon
                  className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                  icon={faPen}
                />
              </button>
            </div>

            {user.accountId && isMe && (
              <div className="col-start-3 col-end-4">
                <button className="text-md text-wht bg-wht rounded-full px-2 h-7 hover:bg-grn hover:bg-opacity-25">
                  <span>Donate</span>
                </button>
              </div>
            )}
          </div>
        </div>
        )
      </div>
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
            <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-10  ">
              RessoucesPacks :
            </h2>
            <h2 className="font-bold not-italic text-wht text-xl  ">...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
