import { createContext, useContext, useMemo, useState } from "react";

export const ConnectContext = createContext(null);

export const ConnectProvider = ({ children }) => {
  const [connect, setConnect] = useState(null);

  const connectValue = useMemo(() => [connect, setConnect], [connect]);

  return (
    <ConnectContext.Provider value={connectValue}>
      {children}
    </ConnectContext.Provider>
  );
};

export default function useConnect() {
  return useContext(ConnectContext);
}
