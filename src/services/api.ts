import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'X-CSRFToken': Cookies.get('csrftoken'),
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

const handleUnauthorized = () => {
  localStorage.removeItem('user');
  Cookies.remove('csrftoken');

  window.location.href = '/auth';
};

export default api;
