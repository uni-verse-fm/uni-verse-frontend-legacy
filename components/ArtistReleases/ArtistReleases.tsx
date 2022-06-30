import { Messages } from "../../common/constants";
import router from "next/router";
import { styles } from "../PlayListsModal";
import ReleaseCard from "../ReleaseCard/ReleaseCard";
import { Pages } from "../../common/types";
import { isoDateYear } from "../../utils/dateUtils";

const ArtistReleases = (props) => {
  const onClickDisplayRelease = (idRelease) => () => {
    router.push({
      pathname: `/${Pages.UserRelease}`,
      query: { id: idRelease },
    });
  };
  return (
    <div className="w-full">
      <div className={styles.wrapper}>
        {props.data?.length ? (
          props.data.map((item, index) => (
            <div key={index} onClick={onClickDisplayRelease(item._id)}>
              <ReleaseCard
                key={index}
                title={item.title}
                image={item.coverName}
                year={isoDateYear(item.createdAt)}
                defaultImageSrc={"/Playlist.png"}
              />
            </div>
          ))
        ) : (
          <div className="flex justify-start items-start mt-10 text-lg">
            <h1 className="text-grn whitespace-nowrap">
              {Messages.EMPTY_RELEASES}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistReleases;
