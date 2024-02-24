import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'X-CSRFToken': Cookies.get('csrftoken')
  }
});