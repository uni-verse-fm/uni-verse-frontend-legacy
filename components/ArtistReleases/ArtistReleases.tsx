import { getReleases } from "../../api/ReleaseAPI";
import { Messages, Pages, urlImage } from "../../common/constants";
import PlaylistCard from "../PlayListCard";
import Spinner from "../Spinner";
import { useQuery } from "react-query";
import useConnect from "../../common/providers/ConnectProvider";
import router from "next/router";
import { NotificationType, notify } from "../Notifications";
import { AxiosError } from "axios";
import { styles } from "../PlayListsModal";
import ReleaseCard from "../ReleaseCard";

const ArtistReleases = (props) => {
    let releases = [
        { name: " Release N°1 ", year: "2019", image: urlImage },
        { name: " Release N°1", year: "2020", image: urlImage },
        { name: " Release N°2", year: "2013", image: urlImage },
        { name: " Release N°3", year: "2015", image: urlImage },
        { name: " Release N°4", year: "2013", image: urlImage },
        { name: " Release N°5", year: "2017", image: urlImage },
        { name: " Release N°6", year: "2018", image: urlImage },
        { name: " Release N°7", year: "2012", image: urlImage },
        { name: " Release N°4", year: "2012", image: urlImage },
        { name: " Release N°5", year: "2018", image: urlImage },
        { name: " Release N°6", year: "2016", image: urlImage },
        { name: " Release N°7", year: "2018", image: urlImage },
      ];
    
  const [connect, setConnect] = useConnect();

  /* A remplacer par getReleases d'un User (by idUser) */
  const { status, data } = useQuery(
    "Releases",
    () => getReleases().then((res) => res.data),
    {
      onSuccess: (res) => {
        if (res.status === 401) {
          notify("Releases bay from success");
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


  const onClickDisplayRelease = (idRelease) => () => {
    router.push({
      pathname: `/${Pages.UserRelease}`,
      query: { id: idRelease },
    });
  };
  return (
    <div className="w-full">
      
      <div className={styles.wrapper}>
        {status === "loading" ? (
          <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-full">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-full">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD} </h1>
          </div>
        ) : status === "success" ? (
          data.length ? (
            data.map((item, index) => (
              <div
                key={index}
                  onClick={onClickDisplayRelease(item._id)}
                  
              >
                <ReleaseCard
                  key={index}
                  title={item.title}
                  image={item.image}
                  year="2013"
                  defaultImageSrc={urlImage}
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center mt-10 text-lg">
              <h1 className="text-grn whitespace-nowrap">
                {Messages.EMPTY_PLAYLISTS}
              </h1>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default ArtistReleases;
