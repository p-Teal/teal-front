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
