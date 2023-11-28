import axios from "axios";
import { getAuthenticatedUser } from "./Authentication";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async function (config) {
  const user = await getAuthenticatedUser();
  if (user) {
    config.headers.authorization = `Bearer ${user?.jwtToken}`;
  }

  return config;
});

export default api;
