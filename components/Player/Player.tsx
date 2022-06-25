import {
  faArrowLeft,
  faArrowRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../../common/providers/PlayerProvider";
import DefilingText from "./DefilingText";
import ReaderTimeline from "./ReaderTimeline";

const Player = () => {
  const { state } = useContext(PlayerContext);

  return (
    <div className={`flex flex-col h-max w-full mt-auto`}>
      <div className="overflow-hidden mx-4 text-grn">
        <DefilingText
          value={`${state.trackInfo?.author} - ${state.trackInfo?.title}`}
        />
      </div>
      <ReaderTimeline
        duration={state.playerState?.duration || 0}
        playerTime={state.playerState?.position || 0}
        onSlide={(value) => state.onSlide(value)}
      />
      <div className="w-full h-16 flex text-grn">
        <a
          onClick={state.previousTrack}
          className="bg-gry hover:bg-drk rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="m-auto" />
        </a>
        <a
          onClick={state.onPlayPauseClick}
          className="bg-gry hover:bg-drk rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon
            icon={state.playerState?.isPlaying ? faPause : faPlay}
            className="m-auto"
          />
        </a>
        <a
          onClick={state.nextTrack}
          className="bg-gry hover:bg-drk rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowRight} className="m-auto" />
        </a>
      </div>
    </div>
  );
};

export default Player;
