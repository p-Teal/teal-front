import React, { useEffect, createContext } from "react";
import { appReducer } from "./appReducer";

export interface IInitialState {
  voluntarioId: string;
  voluntarioNome: string;
  voluntarioCpf: string;
  admin: boolean;
}

const initialState: IInitialState = {
  voluntarioId: '',
  voluntarioNome: '',
  voluntarioCpf: '',
  admin: false,
};

export const AppContext = createContext<any | undefined>(undefined);

type AppProps = {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ ...state as IInitialState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  return React.useContext(AppContext);
}

export { AppProvider, initialState, useAppContext };

