import { Messages } from "../../common/constants";
import router from "next/router";
import { styles } from "../PlayListsModal";
import ResourcePackCard from "../ResourcePackCard";
import { Pages } from "../../common/types";

const ResourcesPacks = ({ packs }) => {
  const onClickDisplayResourcePack = (idResourcePack) => () => {
    router.push({
      pathname: `/${Pages.UserResourcePack}`,
      query: { id: idResourcePack },
    });
  };

  return (
    <div className="w-full text-wht">
      <div className={styles.wrapper}>
        {packs?.length ? (
          packs.map((item, index) => (
            <div key={index} onClick={onClickDisplayResourcePack(item._id)}>
              <ResourcePackCard key={index} resourcePack={item} />
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
