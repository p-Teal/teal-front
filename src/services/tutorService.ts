import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/tutor`,
  withCredentials: true,
});

export const getTutores = async () => {
  try {
    const response = await service.get("/getTutores");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteTutor = async (id: string) => {
  try {
    const response = await service.delete(`/deleteTutor/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createTutor = async (tutor: any) => {
  try {
    const response = await service.post("/createTutor", tutor);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getTutor = async (id: string) => {
  try {
    const response = await service.get(`/getTutor/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
