import { Messages } from "../../common/constants";
import PlaylistCard from "../PlayListCard";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";
import { getUserPlaylists } from "../../api/PlaylistAPI";
import { NotificationType, Pages } from "../../common/types";

const Playlists = (props) => {
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
    <div className="h-full">
      {props.modalDisplay === "true" && (
        <div className="items-start mt-10 mb-5 ml-6 text-grn text-lg">
          Playlists :
        </div>
      )}

      <div className={"h-full "}>
        <div className="w-full h-full flex flex-wrap gap-6 px-4">
          {props.playlists?.length ? (
            props.playlists.map((item, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
