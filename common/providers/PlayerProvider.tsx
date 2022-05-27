import React, { createContext, useReducer, Dispatch } from "react";
import { Track } from "../../components/Player/Player";
import { playerReducer, PlayerActions } from "../reducers/player-reducer";

type PlayerType = {
  className: string;
  tracks: Track[];
  trackIndex?: number;
};

type InitialStateType = {
  player: PlayerType;
};

const initialState = {
  player: {
    className: "mt-auto",
    tracks: [],
    trackIndex: 0,
  },
};

const PlayerContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<PlayerActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ player }: InitialStateType, action: PlayerActions) => ({
  player: playerReducer(player, action),
});

const PlayerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
