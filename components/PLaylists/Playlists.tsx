import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPlaylists } from "../../api/PlaylistAPI";
import { Messages } from "../../common/constants";
import { notify } from "../Notifications";
import PlaylistCard from "../PlayListCard";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import styles from "./PlayListsModal.module.css";


const Playlists = ({ handleShowPlaylistContent }) => {
  const { status, data } = useQuery("repoData", () =>
    getPlaylists().then((res) => res.data)
  );

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

      <div className={styles.wrapper}>
        {status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : (
          data.map(function (item) {
            return (
              <PlaylistCard
                key={item.id}
                name={item.name}
                image={item.image}
                owner={item.owner}
                onClick={(_: any) => handleShowPlaylistContent(item.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Playlists;

