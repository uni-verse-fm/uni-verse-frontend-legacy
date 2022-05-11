import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const GlobalContext = createContext(null);

export const ConnectProvider = ({ children }) => {
  const [connect, setConnect] = useState(null);

  const connectValue = useMemo(() => [connect, setConnect], [connect]);

  return (
    <GlobalContext.Provider value={connectValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default function useConnect() {
  return useContext(GlobalContext);
}
