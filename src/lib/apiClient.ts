import axios from "axios";

import { redirect } from "next/navigation"; // Importar para redirección en servidor

import { createClient } from "./supabase/server";
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
    // Obtener el token de autenticación desde el almacenamiento local o cookies
    // const token = localStorage.getItem("authToken");

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
    // if (error.response?.status === 403) {
    //   console.error("Acceso denegado. Redirigiendo...");

    //   if (typeof window !== "undefined") {
    //     // Redirigir en el cliente
    //     window.location.href = "/forbidden";
    //   } else {
    //     // Redirigir en el servidor (Next.js)
    //     redirect("/forbidden");
    //   }
    // } else {
    //   console.log("Error desconocido:", error);
    // }

    return Promise.reject(error);
  }
);

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 403) {
//       console.error("Acceso denegado. Redirigiendo...");

//       if (typeof window !== "undefined") {
//         // Redirigir en el cliente
//         window.location.href = "/forbidden";
//       } else {
//         // Redirigir en el servidor (Next.js)
//         redirect("/forbidden");
//       }
//     }

//     return Promise.reject(error);
//   }
// );
export default apiClient;
