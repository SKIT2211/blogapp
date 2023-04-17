import axios from 'axios'

function getLocalAccessToken() {
    let accessToken = JSON.parse(localStorage.getItem("Loggedinuser"));
    accessToken = accessToken.accesstoken
    return accessToken;
}

function getLocalRefreshToken() {
    let refreshToken = JSON.parse(localStorage.getItem("Loggedinuser"));
    refreshToken = refreshToken.refreshtoken
    return refreshToken;
}

function refreshToken() {
    return axoisInstance.post("http://localhost:9000/users/refresh", {
        refreshToken: getLocalRefreshToken(),
    });
}

// axoisInstance.defaults.headers.common['Authorization'] = 'Auth From instance';
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
            // Access Token was expired
            if (err.response.status === 419 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await refreshToken();
                    console.log("data",rs);
                    const  accessToken  = rs?.data;
                    localStorage.setItem("accessToken", JSON.stringify(accessToken));
                    axoisInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

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

export default axoisInstance 