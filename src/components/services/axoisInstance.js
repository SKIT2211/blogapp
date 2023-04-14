import axios from 'axios'

function getLocalAccessToken() {
    const accessToken = localStorage.getItem("Loggedinuser");
    accessToken = accessToken.accesstoken
    return accessToken;
}

function getLocalRefreshToken() {
    const refreshToken = localStorage.getItem("Loggedinuser");
    refreshToken = refreshToken.refreshtoken
    return refreshToken;
  }

// axoisInstance.defaults.headers.common['Authorization'] = 'Auth From instance';
const axoisInstance = axios.create({});

axoisInstance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axoisInstance.interceptors.response.use(
    // (response) => {
    //     return response;
    // },
    // (error) => {
    //     return Promise.reject(error);
    // }

    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await refreshToken();
                    const { accessToken } = rs.data;
                    localStorage.setItem("accessToken", accessToken);
                    axoisInstance.defaults.headers.common["Authorization"] = accessToken;

                    return instance(originalConfig);
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

export default axoisInstance 