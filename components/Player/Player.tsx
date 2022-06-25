import {
  faArrowLeft,
  faArrowRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { trackSource } from "../../common/constants";
import { PlayerContext } from "../../common/providers/PlayerProvider";
import DefilingText from "./DefilingText";
import ReaderTimeline from "./ReaderTimeline";

const Player = () => {
  const { state } = useContext(PlayerContext);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    state.player.trackIndex || 0
  );
  const track = useRef(typeof Audio !== "undefined" && new Audio(""));
  const [playing, setPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const [tracks, setTracks] = useState(state.player.tracks);

  const onTimeSlide = (timelineTime: number) => {
    const ref = track.current;
    if (ref) {
      setTime(timelineTime);
      ref.currentTime = timelineTime;
    }
  };

  const onTracksChange = (newTracks) => {
    setTracks(newTracks);
    track.current?.pause();
    const newUrl = trackSource + newTracks[state.player.trackIndex].fileName;
    track.current.src = newUrl;
    track.current.load();
    track.current.play();
    setPlaying(true);
  };

  useEffect(() => {
    state.player.tracks?.length && onTracksChange(state.player.tracks);
  }, [state.player.tracks]);

  useEffect(() => {
    const element = track.current;
    if (element) {
      const timeUpdate = () => {
        setTime(element?.currentTime);
      };
      element?.addEventListener("ended", () => setPlaying(false));
      element?.addEventListener("timeupdate", timeUpdate);
      return () => {
        element?.removeEventListener("ended", () => setPlaying(false));
        element?.removeEventListener("timeupdate", timeUpdate);
      };
    }
  });

  const onPlayPauseClick = () => {
    if (track.current?.src) {
      playing ? track.current.pause() : track.current.play();
      setPlaying(!playing);
    } else setPlaying(false);
  };

  const next = () => {
    if (currentTrackIndex + 1 < tracks.length) {
      const newUrl = trackSource + tracks[currentTrackIndex + 1].fileName;
      setCurrentTrackIndex(currentTrackIndex + 1);
      if (track.current.src !== newUrl) track.current.src = newUrl;
      track.current.load();
      playing && track.current.play();
    }
  };

  const previous = () => {
    if (currentTrackIndex - 1 >= 0) {
      const newUrl = trackSource + tracks[currentTrackIndex - 1].fileName;
      setCurrentTrackIndex(currentTrackIndex - 1);
      if (track.current.src !== newUrl) track.current.src = newUrl;
      track.current.load();
      playing && track.current.play();
    }
  };

  return (
    <div className={`flex flex-col h-max w-full ${state.player.className}`}>
      <div className="overflow-hidden mx-4 text-grn">
        <DefilingText
          value={
            state.player.tracks
              ? `${tracks[currentTrackIndex]?.author?.username} - ${tracks[currentTrackIndex]?.title}`
              : ""
          }
        />
      </div>
      <ReaderTimeline
        duration={track.current?.duration || 0}
        playerTime={time || 0}
        onSlide={onTimeSlide}
      />
      <div className="w-full h-16 flex text-grn">
        <a
          onClick={previous}
          className="bg-gry hover:bg-drk rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="m-auto" />
        </a>
        <a
          onClick={onPlayPauseClick}
          className="bg-gry hover:bg-drk rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon
            icon={playing ? faPause : faPlay}
            className="m-auto"
          />
        </a>
        <a
          onClick={next}
          className="bg-gry hover:bg-drk rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowRight} className="m-auto" />
        </a>
      </div>
    </div>
  );
};

export default Player;
