import axios from "axios";

import { redirect } from "next/navigation"; // Importar para redirección en servidor

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Obtener el token de autenticación desde el almacenamiento local o cookies
    // const token = localStorage.getItem("authToken");
    const token =
      "eyJhbGciOiJIUzI1NiIsImtpZCI6InlkMEJQVkZTY01sUFI2clkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2NubmV2emJwdmplb2d3b2pjaGVqLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4YzY2Y2NkNy1kNTQ0LTRkYmQtYjk2NS03ZjQyYWQ0ZjJkMGIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM5MTM2ODUxLCJpYXQiOjE3MzkxMzMyNTEsImVtYWlsIjoiZGF2aWQudGhlcmFuMDNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCIsImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS2RnTW40VnpKR3JMUEtKakYzWGZCcEhBWTVISWdnMWRyRkZzSF83OUV1cHYzSWpyRno9czk2LWMiLCJlbWFpbCI6ImRhdmlkLnRoZXJhbjAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJEYXZpZCBBbGVqYW5kcm8gVGhlcmFuIE1vcmFsZXMiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoiRGF2aWQgQWxlamFuZHJvIFRoZXJhbiBNb3JhbGVzIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS2RnTW40VnpKR3JMUEtKakYzWGZCcEhBWTVISWdnMWRyRkZzSF83OUV1cHYzSWpyRno9czk2LWMiLCJwcm92aWRlcl9pZCI6IjExMzQ3Mzg4MDg5MzM1Nzg3NTI3OSIsInN1YiI6IjExMzQ3Mzg4MDg5MzM1Nzg3NTI3OSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzM5MTMzMjUxfV0sInNlc3Npb25faWQiOiI5M2U0OWY0OC02OTY3LTQwNTgtYTYxYi03NmQxODVlNGRlZDQiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.eRtxgZqQyPx_pcRTxahHKURF2-3n-QOQcrupBeagOM0";
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
    if (error.response?.status === 403) {
      console.error("Acceso denegado. Redirigiendo...");

      if (typeof window !== "undefined") {
        // Redirigir en el cliente
        window.location.href = "/forbidden";
      } else {
        // Redirigir en el servidor (Next.js)
        redirect("/forbidden");
      }
    }else{
      console.log("Error desconocido:", error);
    }

    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("Acceso denegado. Redirigiendo...");

      if (typeof window !== "undefined") {
        // Redirigir en el cliente
        window.location.href = "/forbidden";
      } else {
        // Redirigir en el servidor (Next.js)
        redirect("/forbidden");
      }
    }

    return Promise.reject(error);
  }
);
export default apiClient;
