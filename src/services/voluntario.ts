import axios from "axios";


const axiosAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/voluntario`,
})

export const cadastrarVoluntario = async (voluntario: any) => {
  try {
    const response = await axiosAuth.post("/registro", voluntario);
    // return response.data;
    return response;
  } catch (error: any) {
    // return error.response.data;
    return error.response;
  }
}