import { getPlaylists } from "../../api/PlaylistAPI";
import { Messages } from "../../common/constants";
import PlaylistCard from "../PlayListCard";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import { styles } from "../PlayListsModal";
import useConnect from "../../common/providers/ConnectProvider";
import router from "next/router";
import { NotificationType, notify } from "../Notifications";
import { AxiosError } from "axios";

const Playlists = ({ handleShowPlaylistContent, playlists }) => {
  const [connect, setConnect] = useConnect();

  const { status, data } = useQuery(
    "playlists",
    () => getPlaylists().then((res) => res.data),
    {
      initialData: playlists,
      onSuccess: (res) => {
        if (res.status === 401) {
          notify("Playlists bay from success");
          setConnect(false);
          router.replace("/login");
        }
      },
      onError: (error: AxiosError) => {
        if (error.response.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          setConnect(false);
          router.replace("/login");
        }
      },
    }
  );

  return (
    <>
      <div className="ml-10 mb-5 text-grn text-lg">PlayLists</div>
      <div className={styles.wrapper}>
        {status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : status === "success" ? (
          data.length ? (
            data.map((item, index) => (
              <div
                key={index}
                onClick={() => handleShowPlaylistContent(item.id)}
              >
                <PlaylistCard
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  owner={item.owner}
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center mt-10 text-lg">
              <h1 className="text-grn whitespace-nowrap">
                {Messages.EMPTY_PLAYLIST}
              </h1>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Playlists;
