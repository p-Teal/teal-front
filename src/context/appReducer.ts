import { initialState } from "./appContext";

export const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_VOLUNTARIO":
      return {
        ...state,
        voluntarioId: action.payload.voluntarioId,
        voluntarioName: action.payload.voluntarioName,
        voluntarioCpf: action.payload.voluntarioCpf,
        admin: action.payload.admin,
      }
    case "LOGOUT":
      return {
        ...initialState,
      }
    default:
      return state;
  }
}
