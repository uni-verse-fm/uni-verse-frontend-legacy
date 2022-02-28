import {
  faArrowLeft,
  faArrowRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DefilingText from "./DefilingText";
import ReaderTimeline from "./ReaderTimeline";

interface PlayerProps {
  className?: string;
}

const Player = ({ className }: PlayerProps) => {
  const [playing, setPlaying] = useState<boolean>(false);

  const onPreviousClick = () => {
    console.log("Playing previous song !");
  };

  const onNextClick = () => {
    console.log("Skipping to next song ! ");
  };

  const onPlayPauseClick = () => {
    playing ? console.log("Pausing...") : console.log("Playing...");

    setPlaying(!playing);
  };
  return (
    <div className={`flex flex-col h-max w-full text-grn ${className}`}>
      <div className="overflow-hidden mx-4">
        <DefilingText value="The pretty Reckless - The great gig in the sky" />
      </div>
      <ReaderTimeline />
      <div className="w-full h-16 flex">
        <a
          onClick={onPreviousClick}
          className="bg-gry hover:bg-blck rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="m-auto" />
        </a>
        <a
          onClick={onPlayPauseClick}
          className="bg-gry hover:bg-blck rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon
            icon={playing ? faPause : faPlay}
            className="m-auto"
          />
        </a>
        <a
          onClick={onNextClick}
          className="bg-gry hover:bg-blck rounded-lg m-auto h-12 w-12 flex cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowRight} className="m-auto" />
        </a>
      </div>
    </div>
  );
};

export default Player;
