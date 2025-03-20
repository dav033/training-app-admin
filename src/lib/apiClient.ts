import axios from "axios";

import { getToken } from "@/app/actions";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const data = await getToken();

    const token = data.session?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(
      "Error en la respuesta:",
      error.response?.status,
      error.response
    );

    return Promise.reject(error);
  }
);

export default apiClient;
