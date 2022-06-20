import React, { createContext, Dispatch, useRef, useState } from "react";

type InitialStateType = {
  refreshToken: string;
  setRefreshToken: Dispatch<React.SetStateAction<string | undefined>>;
};

const AuthContext = createContext<InitialStateType>({} as InitialStateType);

const AuthProvider = (props: any) => {
  const [refreshToken, setRefreshToken] = useState(undefined);

  React.useEffect(() => {
    return () => {
      setRefreshToken(undefined);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        setRefreshToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
