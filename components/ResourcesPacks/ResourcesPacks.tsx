import { Messages } from "../../common/constants";
import router from "next/router";
import { styles } from "../PlayListsModal";
import ResourcePackCard from "../ResourcePackCard";
import Spinner from "../Spinner";
import { Pages,NotificationType } from "../../common/types";
import {getResourcePacks} from  "../../api/ResourcePackAPI"
import { AxiosError } from "axios";
import { notify } from "../Notifications";
import { useQuery } from "react-query";


const ResourcesPacks = (props) => {




const{ data, status } = useQuery("getResourcePacks", () => getResourcePacks(),
{
  onError: (error: AxiosError) => {
    if (error.response?.status === 401) {
      notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
      router.replace(`/${Pages.Login}`);
    }
  },
}
);
  

  const onClickDisplayResourcePack = (idResourcePack) => () => {
    router.push({
      pathname: `/${Pages.UserRelease}`,
      query: {id: idResourcePack},
    });
  };


  return (
    <div className="w-full text-wht">
    
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
