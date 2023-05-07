import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/registro`,
  withCredentials: true,
});

export const createRegistro = async (registro: any) => {
  try {
    const response = await service.post("/createRegistro", registro);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getRegistros = async (id: string) => {
  try {
    const response = await service.get(`/getRegistros/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteRegistro = async (id: string) => {
  try {
    const response = await service.delete(`/deleteRegistro/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
