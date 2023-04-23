import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/doacao`,
  withCredentials: true,
});

export const getDoacoes = async () => {
  try {
    const response = await service.get("/getDoacoes");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDoacao = async (id: string) => {
  try {
    const response = await service.delete(`/deleteDoacao/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const desativaDoacao = async (id: string) => {
  try {
    const response = await service.post(`/desativarDoacao/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createDoacao = async (doacao: any) => {
  try {
    const response = await service.post("/createDoacao", doacao);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
