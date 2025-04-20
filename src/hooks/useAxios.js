import axios from "axios";
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_URL;

const useAxios = () => {
  const { isLogin, userdata, token } = useSelector((store) => store.userReducer);

  const axiosInstance = axios.create({
    baseURL: API_URL
  });

  axiosInstance.interceptors.request.use(
    async (config) => {

      config.headers["Content-Type"] = "application/json";
      config.headers["token"] = token;
      config.headers["Authorization"] = `Bearer ${token}`;
      // config.withCredentials = true;

      // SENT DEFAULT PARAMS TO GET API :
      if (config.method === "get") {
        config["data"] = {};
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  const Axios = axiosInstance;

  return [Axios];
};

export default useAxios;
