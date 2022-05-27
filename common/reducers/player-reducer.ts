import { Track } from "../../components/Player/Player";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  PlaylistPlay = "PLAY_PLAYLIST",
  ReleasePlay = "PLAY_RELEASE",
  TrackPlay = "PLAY_TRACK",
  RandomPlay = "PLAY_RANDOM",
}

type PlayerType = {
  className: string;
  tracks: Track[];
  trackIndex?: number;
};

type PlayerPayload = {
  [Types.PlaylistPlay]: {
    className: string;
    tracks: Track[];
    trackIndex: number;
  };
  [Types.ReleasePlay]: {
    className: string;
    tracks: Track[];
    trackIndex: number;
  };
  [Types.TrackPlay]: {
    className: string;
    track: Track;
  };
  [Types.RandomPlay]: {
    className: string;
    tracks: Track[];
  };
};

export type PlayerActions =
  ActionMap<PlayerPayload>[keyof ActionMap<PlayerPayload>];

export const playerReducer = (
  state: PlayerType,
  action: PlayerActions 
) => {
  switch (action.type) {
    case Types.PlaylistPlay:
      return action.payload;
    case Types.ReleasePlay:
      return action.payload;
    case Types.TrackPlay:
      return {
        className: action.payload.className,
        tracks: [action.payload.track],
      };
    case Types.RandomPlay:
      return {
        className: action.payload.className,
        tracks: action.payload.tracks,
      };
    default:
      return state;
  }
};