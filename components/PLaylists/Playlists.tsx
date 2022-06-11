import { getPlaylists } from "../../api/PlaylistAPI";
import { Messages, Pages, urlImage } from "../../common/constants";
import PlaylistCard from "../PlayListCard";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import useConnect from "../../common/providers/ConnectProvider";
import router from "next/router";
import { NotificationType, notify } from "../Notifications";
import { AxiosError } from "axios";
import { styles } from "../PlayListsModal";

const Playlists = (props) => {
  const [connect, setConnect] = useConnect();
  /* A remplacer par getPlaylists d'un User (by idUser) */
  const { status, data } = useQuery(
    "playlists",
    () => getPlaylists().then((res) => res.data),
    {
      onSuccess: (res) => {
        if (res.status === 401) {
          notify("Playlists bay from success");
          setConnect(false);
          router.replace(`/${Pages.Login}`);
        }
      },
      onError: (error: AxiosError) => {
        if (error.response.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          setConnect(false);
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
                  owner={item.owner}
                  defaultImageSrc={urlImage}
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
