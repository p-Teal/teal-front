import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/animal`,
  withCredentials: true,
});

export const createAnimal = async (animal: any) => {
  try {
    const response = await service.post("/createAnimal", animal);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getAnimais = async () => {
  try {
    const response = await service.get("/getAnimais");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getAnimal = async (id: string) => {
  try {
    const response = await service.get(`/getAnimal/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const updateFotoAnimal = async (id: string, urlFoto: string) => {
  try {
    const response = await service.patch(`/updateFoto/${id}`, { urlFoto });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const updateAnimal = async (id: string, animal: any) => {
  try {
    const response = await service.patch(`/updateAnimal/${id}`, animal);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
