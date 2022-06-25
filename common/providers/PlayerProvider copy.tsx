import React, {
  createContext,
  useReducer,
  Dispatch,
  useState,
  useEffect,
  useRef,
} from "react";
import { trackSource } from "../constants";
import { ActionMap, Track, Types } from "../types";

type PlayerType = {
  position: number;
  duration: number;
  isLoaded: boolean;
  isPlaying: boolean;
};

type ReducerPlayerType = {
  tracks: Track[];
  trackIndex?: number;
};

const initialState: ReducerPlayerType = {
  tracks: [],
  trackIndex: 0,
};

type TrackInfo = {
  title: string;
  author: string;
};

type InitialPlayerType = {
  tracks: Track[];
  trackIndex?: number;
  playerState: PlayerType;
  trackInfo: TrackInfo;
  unload: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  hasNext: () => boolean;
  hasPrevious: () => boolean;
  onPlayPauseClick: () => void;
  onSlide: (position: number) => void;
};

type PlayerPayload = {
  [Types.PlaylistPlay]: {
    tracks: Track[];
    trackIndex: number;
  };
  [Types.ReleasePlay]: {
    tracks: Track[];
    trackIndex: number;
  };
  [Types.TrackPlay]: {
    track: Track;
  };
  [Types.RandomPlay]: {
    tracks: Track[];
  };
};

export type PlayerActions =
  ActionMap<PlayerPayload>[keyof ActionMap<PlayerPayload>];

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

  const unload = () => false;
  const hasNext = () =>
    state.tracks ? currentTrackIndex + 1 < state.tracks?.length : false;
  const hasPrevious = () => (state.tracks ? currentTrackIndex - 1 >= 0 : false);

  const nextTrack = async () => {
    if (currentTrackIndex + 1 < state.tracks.length) {
        const newUrl = trackSource + sound[currentTrackIndex + 1].fileName;
        setCurrentTrackIndex(currentTrackIndex + 1);
        if (sound.current.src !== newUrl) sound.current.src = newUrl;
        sound.current.load();
        playing && sound.current.play();
      }
  };

  const previousTrack = async () => {
    if (currentTrackIndex - 1 >= 0) {
        const newUrl = trackSource + state.tracks[currentTrackIndex - 1].fileName;
        setCurrentTrackIndex(currentTrackIndex - 1);
        if (sound.current.src !== newUrl) sound.current.src = newUrl;
        sound.current.load();
        playing && sound.current.play();
      }
  };

  const onPlayPauseClick = async () => {
    if (sound.current?.src) {
        playing ? sound.current.pause() : sound.current.play();
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
      element?.addEventListener("ended", () => setPlaying(false));
      element?.addEventListener("timeupdate", timeUpdate);
      return () => {
        element?.removeEventListener("ended", () => setPlaying(false));
        element?.removeEventListener("timeupdate", timeUpdate);
      };
    }
  });

  const onTracksChange = async (newTracks: any) => {
    sound.current?.pause();
    const newUrl = trackSource + newTracks[currentTrackIndex].fileName;
    sound.current.src = newUrl;
    sound.current.load();
    sound.current.play();
    setPlaying(true);
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
          trackIndex: state.trackIndex,
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
          unload,
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
