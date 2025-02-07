import axios from "axios";

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
      "eyJhbGciOiJIUzI1NiIsImtpZCI6InlkMEJQVkZTY01sUFI2clkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2NubmV2emJwdmplb2d3b2pjaGVqLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4YzY2Y2NkNy1kNTQ0LTRkYmQtYjk2NS03ZjQyYWQ0ZjJkMGIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM4OTQxNjU0LCJpYXQiOjE3Mzg5MzgwNTQsImVtYWlsIjoiZGF2aWQudGhlcmFuMDNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCIsImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS2RnTW40VnpKR3JMUEtKakYzWGZCcEhBWTVISWdnMWRyRkZzSF83OUV1cHYzSWpyRno9czk2LWMiLCJlbWFpbCI6ImRhdmlkLnRoZXJhbjAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJEYXZpZCBBbGVqYW5kcm8gVGhlcmFuIE1vcmFsZXMiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoiRGF2aWQgQWxlamFuZHJvIFRoZXJhbiBNb3JhbGVzIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS2RnTW40VnpKR3JMUEtKakYzWGZCcEhBWTVISWdnMWRyRkZzSF83OUV1cHYzSWpyRno9czk2LWMiLCJwcm92aWRlcl9pZCI6IjExMzQ3Mzg4MDg5MzM1Nzg3NTI3OSIsInN1YiI6IjExMzQ3Mzg4MDg5MzM1Nzg3NTI3OSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzM4OTM4MDU0fV0sInNlc3Npb25faWQiOiJmNTZmNDc0Zi1lOGQxLTQ4NmYtOWQ0Yy0xM2E5ZTEzZGM2M2UiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.hjSiGKLW9xCX3sswcpfCc1vRAksSZ-q5kTkx01o3kPQ";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejar errores de solicitud
    return Promise.reject(error);
  }
);

export default apiClient;
