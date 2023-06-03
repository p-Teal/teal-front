import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/stats`,
  withCredentials: true,
});

export const getStats = async () => {
  try {
    const response = await service.get("/getStats");
    return response;
  } catch (error: any) {
    return error.response;
  }
};