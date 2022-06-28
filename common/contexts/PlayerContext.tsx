import React, {
  createContext,
  useReducer,
  Dispatch,
  useState,
  useEffect,
  useRef,
} from "react";
import { addView } from "../../api/ViewsAPI";
import { trackSource } from "../constants";
import {
  InitialPlayerType,
  PlayerActions,
  ReducerPlayerType,
  Types,
} from "../types";

const initialState: ReducerPlayerType = {
  tracks: [],
  trackIndex: 0,
  className: "mt-auto",
};

export const playerReducer = (
  state: ReducerPlayerType,
  action: PlayerActions
) => {
  switch (action.type) {
    case Types.PlaylistPlay:
      return {
        ...action.payload,
        trackIndex: action.payload.trackIndex || 0,
      };
    case Types.ReleasePlay:
      return {
        ...action.payload,
        trackIndex: action.payload.trackIndex || 0,
      };
    case Types.TrackPlay:
      return {
        tracks: [action.payload.track],
        trackIndex: 0,
      };
    case Types.RandomPlay:
      return {
        tracks: action.payload.tracks,
      };
    default:
      return state;
  }
};

const PlayerContext = createContext<{
  state: InitialPlayerType;
  dispatch: Dispatch<PlayerActions>;
}>({
  state: {} as InitialPlayerType,
  dispatch: () => null,
});

const mainReducer = (props: ReducerPlayerType, action: PlayerActions) =>
  playerReducer(props, action);

const PlayerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);

  const sound = useRef(typeof Audio !== "undefined" && new Audio(""));

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(
    state.trackIndex || 0
  );

  const hasNext = () =>
    state.tracks ? currentTrackIndex + 1 < state.tracks?.length : false;
  const hasPrevious = () => (state.tracks ? currentTrackIndex - 1 >= 0 : false);

  const playByIndex = (index: number) => {
    const newUrl = trackSource + state.tracks[index].fileName;
    setCurrentTrackIndex(index);
    if (sound.current?.src !== newUrl) sound.current.src = newUrl;
    sound.current.load();
    playing && sound.current.play();
  };

  const nextTrack = () =>
    hasNext() ? playByIndex(currentTrackIndex + 1) : playByIndex(0);

  const previousTrack = () =>
    hasPrevious() ? playByIndex(currentTrackIndex - 1) : playByIndex(0);

  const onEnded = () => {
    hasNext() ? nextTrack() : "";
    const track = state.tracks[currentTrackIndex];
    const trackId = track?.id;
    trackId && addView({  track: trackId, release: track?.release?.id });
  };

  const onPlayPauseClick = () => {
    if (sound.current?.src) {
      playing ? sound.current.pause() : sound.current.play();
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.current = undefined;
        }
      : undefined;
  }, []);

  useEffect(() => {
    const element = sound.current;
    if (element) {
      const timeUpdate = () => {
        setPosition(element?.currentTime);
      };
      const playing = () => {
        setPlaying(true);
      };
      const paused = () => {
        setPlaying(false);
      };
      element?.addEventListener("ended", onEnded);
      element?.addEventListener("timeupdate", timeUpdate);
      element?.addEventListener("playing", playing);
      element?.addEventListener("pause", paused);
      return () => {
        element?.removeEventListener("ended", onEnded);
        element?.removeEventListener("timeupdate", timeUpdate);
        element?.removeEventListener("playing", playing);
        element?.removeEventListener("pause", paused);
      };
    }
  });

  const onTracksChange = (newTracks: any) => {
    if (sound.current) {
      const newUrl = trackSource + newTracks[currentTrackIndex].fileName;
      sound.current.src = newUrl;
      sound.current.load();
      sound.current.play();
    }
  };

  const onSlide = async (value: number) => {
    const ref = sound.current;
    if (ref) {
      setPosition(value);
      ref.currentTime = value;
    }
  };

  useEffect(() => {
    state.tracks?.length && onTracksChange(state.tracks);
  }, [state.tracks]);

  return (
    <PlayerContext.Provider
      value={{
        state: {
          tracks: state.tracks,
          trackIndex: currentTrackIndex,
          trackInfo: {
            title: state.tracks?.[currentTrackIndex]?.title,
            author: state.tracks?.[currentTrackIndex]?.author.username,
          },
          playerState: {
            position,
            duration: sound.current?.duration || 0,
            isLoaded: true,
            isPlaying: playing,
          },
          hasNext,
          hasPrevious,
          nextTrack,
          previousTrack,
          onPlayPauseClick,
          onSlide,
        },
        dispatch,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
