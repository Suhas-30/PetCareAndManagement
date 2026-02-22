import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use((config) => {
  const session = localStorage.getItem("userSession");

  if (session) {
    const parsedSession = JSON.parse(session);
    const token = parsedSession.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;