import { api } from './api';
import Cookies from 'js-cookie';

const AUTH_URL = "/users/";

export const register = (formData: FormData) => {
  return api.post(`${AUTH_URL}register/`, formData);
};


export const login = (email: string, password: string) => {
  return api
    .post(`${AUTH_URL}login/`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.key) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        api.get(`${AUTH_URL}csrf/`).then(response => {
          const csrfToken = response.data.csrfToken;
          Cookies.set('csrftoken', csrfToken);
          api.defaults.headers['X-CSRFToken'] = csrfToken;
        });
      }

      return response.data.user;
    });
};

export const logout = async () => {
  try {
    const csrfToken = Cookies.get('csrftoken') || '';
    await api.post(`${AUTH_URL}logout/`, {}, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    });
    api.get(`${AUTH_URL}csrf/`).then(response => {
      const csrfToken = response.data.csrfToken;
      Cookies.set('csrftoken', csrfToken);
      api.defaults.headers['X-CSRFToken'] = csrfToken;
    });
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};

export const getUserDetails = (id: number) => {
  return api.get(`${AUTH_URL}${id}/`);
};