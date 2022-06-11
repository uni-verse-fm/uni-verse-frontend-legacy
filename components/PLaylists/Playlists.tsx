import { Messages } from "../../common/constants";
import PlaylistCard from "../PlayListCard";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";
import { styles } from "../PlayListsModal";
import { getUserPlaylists } from "../../api/PlaylistAPI";
import { NotificationType, Pages } from "../../common/types";


const Playlists = (props) => {
  const { data, status } = useQuery(
    "playlists",
    () => getUserPlaylists(props.userId),
    {
      onError: (error: AxiosError) => {
        if (error.response?.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          router.replace(`/${Pages.Login}`);
        }
      },
    }
  );

  const onClickDisplayPlaylist = (idPlaylist) => () => {
    if (props.modalDisplay === "false") {
      router.push({
        pathname: `/${Pages.UserPlaylist}`,
        query: { id: idPlaylist },
      });
    } else {
      props.handleShowPlaylistContent(idPlaylist);
    }
  };

  return (
    <>
      {props.modalDisplay === "true" && (
        <div className="items-start mt-10 mb-5 ml-6 text-grn text-lg">
          Playlists :
        </div>
      )}

      <div className={styles.wrapper}>
        {status === "loading" ? (
          <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-full">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-full">
            <h1 className="text-rd whitespace-nowrap">{props.modall}</h1>
          </div>
        ) : status === "success" ? (
          data.length ? (
            data.map((item, index) => (
              <div key={index} onClick={onClickDisplayPlaylist(item._id)}>
                <PlaylistCard
                  key={index}
                  title={item.title}
                  image={item.image}
                  owner={item.owner?.username}
                  defaultImageSrc={"/Playlist.png"}
                />
              </div>
            ))
          ) : (
            <div className="flex justify-start items-start mt-10 text-lg">
              <h1 className="text-grn whitespace-nowrap">
                {Messages.EMPTY_PLAYLISTS}
              </h1>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default Playlists;
