import React, { useEffect, createContext } from "react";
import { getVoluntario, logout } from "../services/voluntarioService";
import { appReducer } from "./appReducer";

export interface IInitialState {
  voluntarioId: string;
  voluntarioNome: string;
  voluntarioCpf: string;
  admin: boolean;
  ativo: boolean;
  loadingApp: boolean;
}

const initialState: IInitialState = {
  voluntarioId: "",
  voluntarioNome: "",
  voluntarioCpf: "",
  admin: false,
  ativo: false,
  loadingApp: true,
};

export const AppContext = createContext<any | undefined>(undefined);

type AppProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  const startLoadingApp = () => {
    dispatch({
      type: "START",
    });
  };

  const getVoluntarioAndSet = async () => {
    startLoadingApp();
    const response = await getVoluntario();

    if (response.status === 200) {
      const { admin, _id, nome, cpf, ativo } = response.data.voluntario;
      dispatch({
        type: "SET_VOLUNTARIO",
        payload: {
          admin,
          voluntarioId: _id,
          voluntarioNome: nome,
          voluntarioCpf: cpf,
          ativo,
        },
      });
    } else {
      dispatch({
        type: "SET_VOLUNTARIO",
        payload: {
          admin: false,
          voluntarioId: "",
          voluntarioNome: "",
          voluntarioCpf: "",
          ativo: false,
        },
      });
    }
  };

  const logoutContext = () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    getVoluntarioAndSet();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...(state as IInitialState),
        dispatch,
        startLoadingApp,
        logoutContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return React.useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
