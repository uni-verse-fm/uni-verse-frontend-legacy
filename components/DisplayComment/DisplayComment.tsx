import { faClock, faPlay,faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/providers/PlayerProvider";
import { Track, Types } from "../../common/types";
import { isoDateToDate } from "../../utils/dateUtils";
import { Messages } from "../../common/constants";
import PlaylistCard from "../PlayListCard";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import router from "next/router";
import { notify } from "../Notifications";
import { AxiosError } from "axios";
import { styles } from "../PlayListsModal";
import { getComments } from "../../api/CommentAPI";
import { NotificationType, Pages } from "../../common/types";


const DisplayComment = ({ idTrack }) => {
{/* à remplacer par getSourceComments*/ }
  const { data, status } = useQuery(
    "comments",
    () => getComments(),
    {
      onError: (error: AxiosError) => {
        if (error.response?.status === 401) {
          notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
          router.replace(`/${Pages.Login}`);
        }
      },
    }
  );





  return (
    <div className="Global bg-grey w-full h-full flex flex-col  ">
      <div className="flex flex-row mb-3" >
          <h1 className="text-sm font-bold not-italic text-grn">
            Add a Comment
          </h1>
          <FontAwesomeIcon
                      className="cursor-pointer ml-5 text-grn"
                      icon={faComments}
                    />
        </div>

       
        { idTrack.map((item, index) => (

        <div className="flex flex-row mb-3"   key={index} >
          <div className="text-sm font-bold not-italic text-grn">
           
          </div>
          <FontAwesomeIcon
                      className="cursor-pointer ml-5 text-grn"
                      icon={faComments}
                    />
        </div>


        
        ))}
   
  
    </div>
  );
};

export default DisplayComment;
