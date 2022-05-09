import { createContext, useContext, useMemo, useState } from "react";

export const GlobalContext = createContext(null);

export const ConnectProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  const connectedValue = useMemo(() => [connected, setConnected], [connected]);

  return (
    <GlobalContext.Provider value={connectedValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default function useConnect() {
  return useContext(GlobalContext);
}
