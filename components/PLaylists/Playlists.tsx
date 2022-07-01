import { Messages } from "../../common/constants";
import PlaylistCard from "../PlayListCard";
import router from "next/router";
import { IPlaylistParams, Pages } from "../../common/types";

type IPlaylists = {
  modalDisplay: boolean;
  playlists: Array<IPlaylistParams>;
  handleShowPlaylistContent?: (index: number) => void;
};

const Playlists = ({
  modalDisplay,
  handleShowPlaylistContent,
  playlists,
}: IPlaylists) => {
  const onClickDisplayPlaylist = (idPlaylist: string, index: number) => () => {
    if (!modalDisplay) {
      router.push({
        pathname: `/${Pages.UserPlaylist}`,
        query: { id: idPlaylist },
      });
    } else {
      handleShowPlaylistContent(index);
    }
  };

  return (
    <div className="h-full">
      {modalDisplay && (
        <div className="items-start mt-10 mb-5 ml-6 text-grn text-lg">
          Playlists :
        </div>
      )}

      <div className={"h-full "}>
        <div className="w-full h-full flex flex-wrap gap-6 px-4">
          {playlists?.length > 0 ? (
            playlists.map((item, index) => (
              <div
                key={index}
                onClick={onClickDisplayPlaylist(item._id, index)}
              >
                <PlaylistCard
                  key={index}
                  title={item.title}
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
