import { ActionMap, PlayerType, Track, Types } from "../types";

type PlayerPayload = {
  [Types.PlaylistPlay]: {
    className?: string;
    tracks: Track[];
    trackIndex: number;
  };
  [Types.ReleasePlay]: {
    className?: string;
    tracks: Track[];
    trackIndex: number;
  };
  [Types.TrackPlay]: {
    className?: string;
    track: Track;
  };
  [Types.RandomPlay]: {
    className?: string;
    tracks: Track[];
  };
};

export type PlayerActions =
  ActionMap<PlayerPayload>[keyof ActionMap<PlayerPayload>];

export const playerReducer = (state: PlayerType, action: PlayerActions) => {
  switch (action.type) {
    case Types.PlaylistPlay:
      return {
        ...action.payload,
        className: action.payload.className || "mt-auto",
        trackIndex: action.payload.trackIndex || 0,
      };
    case Types.ReleasePlay:
      return {
        ...action.payload,
        className: action.payload.className || "mt-auto",
        trackIndex: action.payload.trackIndex || 0,
      };
    case Types.TrackPlay:
      return {
        className: action.payload.className || "mt-auto",
        tracks: [action.payload.track],
        trackIndex: 0,
      };
    case Types.RandomPlay:
      return {
        className: action.payload.className || "mt-auto",
        tracks: action.payload.tracks,
      };
    default:
      return state;
  }
};
