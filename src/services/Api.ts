import axios from "axios";
import { getFirebaseAuth } from "./Firebase";
import { TOKEN_EXPIRED_ERROR_CODE } from "./ErrorMessaging";
import { appConfig } from "./AppConfig";

const api = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 10000,
});

export function initializeApi() {
  axios.interceptors.request.use(async function (config) {
    const idToken = await getFirebaseAuth()?.currentUser?.getIdToken();
    if (idToken) {
      config.headers.authorization = `Bearer ${idToken}`;
    }

    return config;
  });

  axios.interceptors.response.use(async function (response) {
    if (response?.data?.code === TOKEN_EXPIRED_ERROR_CODE) {
      // If the token is expired, get a new one and force the refresh
      await getFirebaseAuth()?.currentUser?.getIdToken(true);
    }
    return response;
  });
}

export default api;
