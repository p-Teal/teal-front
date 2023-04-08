import axios from "axios";

const protectedAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/voluntario`,
  withCredentials: true,
});

export const logout = async () => {
  await protectedAxios.get("/logout");
};

export const cadastrarVoluntario = async (voluntario: any) => {
  try {
    const response = await protectedAxios.post("/registro", voluntario);
    // return response.data;
    return response;
  } catch (error: any) {
    // return error.response.data;
    return error.response;
  }
};

export const loginVoluntario = async (voluntario: any) => {
  try {
    const response = await protectedAxios.post("/login", voluntario);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getVoluntario = async () => {
  try {
    const response = await protectedAxios.get("/getVoluntario");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getVoluntarios = async () => {
  try {
    const response = await protectedAxios.get("/getVoluntarios");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getVoluntarioById = async (id: string) => {
  try {
    const response = await protectedAxios.get(`/getVoluntarioById/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteVoluntario = async (cpf: string) => {
  try {
    const response = await protectedAxios.delete(`/deleteVoluntario/${cpf}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const ativarVoluntario = async (cpf: string) => {
  try {
    const response = await protectedAxios.post(`/ativarVoluntario/${cpf}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const desativarVoluntario = async (cpf: string) => {
  try {
    const response = await protectedAxios.post(`/desativarVoluntario/${cpf}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
