import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/adocao`,
  withCredentials: true,
});

export const getAnimaisDisponiveis = async () => {
  try {
    const response = await service.get("/getAnimaisDisponiveis");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getTutorByCpf = async (cpf: string) => {
  try {
    const response = await service.get(`/getTutorAprovadoByCpf/${cpf}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createAdocao = async (data: any) => {
  try {
    const response = await service.post("/createAdocao", data);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getAdocoes = async () => {
  try {
    const response = await service.get("/getAdocoes");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const cancelarAdocao = async (id: string) => {
  try {
    const response = await service.put(`/cancelarAdocao/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteAdocao = async (id: string) => {
  try {
    const response = await service.delete(`/apagarAdocao/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
