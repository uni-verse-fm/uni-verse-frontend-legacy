import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";

interface ConnectProviderType {
  children: ReactElement;
  isConnected: boolean;
}
export const ConnectContext = createContext(null);

export const ConnectProvider = (props: ConnectProviderType) => {
  const [connect, setConnect] = useState(props.isConnected);

  const connectValue = useMemo(() => [connect, setConnect], [connect]);

  return (
    <ConnectContext.Provider value={connectValue}>
      {props.children}
    </ConnectContext.Provider>
  );
};

export default function useConnect() {
  return useContext(ConnectContext);
}
