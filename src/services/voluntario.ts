import axios from "axios";

const axiosAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/voluntario`,
  withCredentials: true,
});

const protectedAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/voluntario`,
  withCredentials: true,
});

protectedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    // console.log(err.response);
    if (err.response.status === 401) {
      console.log("Unauthorized");
      // logoutUser();
    }
    return Promise.reject(err);
  }
);

export const cadastrarVoluntario = async (voluntario: any) => {
  try {
    const response = await axiosAuth.post("/registro", voluntario);
    // return response.data;
    return response;
  } catch (error: any) {
    // return error.response.data;
    return error.response;
  }
};

export const loginVoluntario = async (voluntario: any) => {
  try {
    const response = await axiosAuth.post("/login", voluntario);
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
