import axios from "axios";

export const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

apiRequest.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if(error.status === 401) {
      window.location.href = '/auth/login'
    }
  }
)