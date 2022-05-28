import { ChangeEvent, useEffect, useState } from "react";

type ReaderTimeLineParams = {
  duration: number;
  playerTime: number;
  onSlide: (value: number) => any;
};

const secondsToHMS = (timeInSec: number): string => {
  let timeInString: string = "";
  let time: number = timeInSec;
  if (Math.floor(time / 3600) > 1) {
    const hours = Math.floor(time / 3600);
    timeInString = timeInString.concat(`${hours < 10 ? "0" + hours : hours}:`);
    time = time - hours * 3600;
  }
  const minutes = Math.floor(time / 60);
  timeInString = timeInString.concat(
    `${minutes < 10 ? "0" + minutes : minutes}:`
  );
  const seconds = Math.floor(time - minutes * 60);
  timeInString = timeInString.concat(
    `${seconds < 10 ? "0" + seconds : seconds}`
  );

  return timeInString;
};

const ReaderTimeline = ({
  duration,
  playerTime,
  onSlide,
}: ReaderTimeLineParams) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [sliding, setSliding] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliding(true);
    const value = e.target.value;
    setCurrentTime((+value / 100) * duration);
  };

  const onRelease = () => {
    setSliding(false);
    onSlide(currentTime);
  };

  useEffect(() => {
    duration && setCurrentTime(Math.floor((100 * playerTime) / duration));
  }, [playerTime, duration]);

  return (
    <div className="w-full mx-auto bg-gry px-2 flex content-center items-center">
      <div className=" w-fit h-fit text-xs text-white mx-1">
        {secondsToHMS(sliding ? (currentTime / 100) * duration : playerTime)}
      </div>
      <div className="grow flex items-center">
        <input
          type="range"
          value={currentTime}
          min="0"
          max="100"
          className="w-full gryf h-1 m-0"
          onChange={onChange}
          onMouseUp={onRelease}
          onTouchEnd={onRelease}
        />
      </div>
      <div className="w-fit h-fit text-xs text-white mx-1">
        {secondsToHMS(duration)}
      </div>
    </div>
  );
};

export default ReaderTimeline;
