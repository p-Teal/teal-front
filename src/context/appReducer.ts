import { initialState } from "./appContext";

export const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_VOLUNTARIO":
      return {
        ...state,
        voluntarioId: action.payload.voluntarioId,
        voluntarioNome: action.payload.voluntarioNome,
        voluntarioCpf: action.payload.voluntarioCpf,
        admin: action.payload.admin,
        ativo: action.payload.ativo,
        loadingApp: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        loadingApp: false,
      };
    case "START":
      return {
        ...state,
        loadingApp: true,
      };
    default:
      return state;
  }
};
