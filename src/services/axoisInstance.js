import axios from "axios";
import { APIS } from "../constants/constant";

function getLocalAccessToken() {
  let accessToken = JSON.parse(localStorage.getItem("AccessToken"));
  return accessToken;
}

function getLocalRefreshToken() {
  let refreshToken = JSON.parse(localStorage.getItem("RefreshToken"));
  return refreshToken;
}

function refreshToken() {
  return axoisInstance.post(`${APIS.USERS_API}/refresh`, {
    refreshToken: getLocalRefreshToken(),
  });
}

const axoisInstance = axios.create({});

axoisInstance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axoisInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 419 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          const accessToken = rs?.data;
          localStorage.setItem("AccessToken", JSON.stringify(accessToken));
          axoisInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          return axoisInstance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 419 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default axoisInstance;
