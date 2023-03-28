import React, { useEffect, createContext } from "react";
import { getVoluntario } from "../services/voluntario";
import { appReducer } from "./appReducer";

export interface IInitialState {
  voluntarioId: string;
  voluntarioNome: string;
  voluntarioCpf: string;
  admin: boolean;
}

const initialState: IInitialState = {
  voluntarioId: "",
  voluntarioNome: "",
  voluntarioCpf: "",
  admin: false,
};

export const AppContext = createContext<any | undefined>(undefined);

type AppProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  const getVoluntarioAndSet = async () => {
    const response = await getVoluntario();

    if (response.status === 200) {
      const { admin, _id, nome, cpf } = response.data.voluntario;
      dispatch({
        type: "SET_VOLUNTARIO",
        payload: {
          admin,
          voluntarioId: _id,
          voluntarioNome: nome,
          voluntarioCpf: cpf,
        },
      });
    } else {
      console.log(response);
      if (response.status === 401) return;
    }
  };

  useEffect(() => {
    getVoluntarioAndSet();
  }, []);

  return (
    <AppContext.Provider value={{ ...(state as IInitialState), dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return React.useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
