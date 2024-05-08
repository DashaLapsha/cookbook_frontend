import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'X-CSRFToken': Cookies.get('csrftoken')
  }
});
