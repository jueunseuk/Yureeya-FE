import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, tokenRefreshed) => {
  pendingRequests.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(tokenRefreshed);
    }
  });
  pendingRequests = [];
};

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        }).then(() => {
          return instance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/token/refresh`, {}, { withCredentials: true });

        isRefreshing = false;
        processQueue(null, true);

        return instance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        localStorage.removeItem("userInfo");
        if(refreshError.response.data.code === "AUTH_004") {
          console.log("Unable to renew");
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
