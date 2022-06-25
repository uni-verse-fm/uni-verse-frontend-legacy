import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AES } from "crypto-js";
import React, {
  createContext,
  useReducer,
  Dispatch,
  useState,
  useEffect,
  useRef,
} from "react";
import { addView } from "../../api/AdminAPI";
import { BASE_API, headers, trackSource } from "../constants";
import {
  InitialPlayerType,
  PlayerActions,
  Props,
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

//   sound.current.onplaying = () => {
//     setPlaying(true)
//   }

//   sound.current.onpause = () => {
//     setPlaying(true)
//   }

  const hasNext = () =>
    state.tracks ? currentTrackIndex + 1 < state.tracks?.length : false;
  const hasPrevious = () => (state.tracks ? currentTrackIndex - 1 >= 0 : false);

  const nextTrack = async () => {
    if (currentTrackIndex + 1 < state.tracks.length) {
      const newUrl = trackSource + state.tracks[currentTrackIndex + 1].fileName;
      setCurrentTrackIndex(currentTrackIndex + 1);
      if (sound.current?.src !== newUrl) sound.current.src = newUrl;
      sound.current.load();
      playing && await sound.current.play();
    }
  };

  const previousTrack = async () => {
    if (currentTrackIndex - 1 >= 0) {
      const newUrl = trackSource + state.tracks[currentTrackIndex - 1].fileName;
      setCurrentTrackIndex(currentTrackIndex - 1);
      if (sound.current.src !== newUrl) sound.current.src = newUrl;
      sound.current.load();
      playing && await sound.current.play();
    }
  };

  const onEnded = () => {
    if (hasNext() && !playing) setPlaying(false);
    const trackId = state.tracks[currentTrackIndex]?.id;
    trackId && addView(trackId);
  };

  const onPlayPauseClick = async () => {
    if (sound.current?.src) {
      playing ? sound.current.pause() : await sound.current.play();
      setPlaying(!playing);
    } else setPlaying(false);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.current = undefined;
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const element = sound.current;
    if (element) {
      const timeUpdate = () => {
        setPosition(element?.currentTime);
      };
      element?.addEventListener("ended", onEnded);
      element?.addEventListener("timeupdate", timeUpdate);
      return () => {
        element?.removeEventListener("ended", onEnded);
        element?.removeEventListener("timeupdate", timeUpdate);
      };
    }
  });

  const onTracksChange = async (newTracks: any) => {
    if (sound.current) {
      sound.current?.pause();
      const newUrl = trackSource + newTracks[currentTrackIndex].fileName;
      sound.current.src = newUrl;
      sound.current.load();
      await sound.current.play();
      setPlaying(true);
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
