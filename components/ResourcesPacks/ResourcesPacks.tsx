import { Messages } from "../../common/constants";
import router from "next/router";
import { styles } from "../PlayListsModal";
import ResourcePackCard from "../ResourcePackCard";
import { Pages } from "../../common/types";

const ResourcesPacks = (props) => {
  const onClickDisplayResourcePack = (idResourcePack) => () => {
    router.push({
      pathname: `/${Pages.UserRelease}`,
      query: {id: idResourcePack},
    });
  };
  return (
    <div className="w-full">
      <div className={styles.wrapper}>
        {props.data?.length ? (
          props.data.map((item, index) => (
            <div key={index} onClick={onClickDisplayResourcePack(item._id)}>
              <ResourcePackCard
                key={index}
                title={item.title}
                image={item.coverName}
                year="2013"
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

export default ResourcesPacks;
