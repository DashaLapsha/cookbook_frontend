import { api } from './api';
import Cookies from 'js-cookie';

const AUTH_URL = "/users/";

export const register = (username: string, email: string, password1: string, password2: string) => {
  return api.post(`${AUTH_URL}register/`, {
    username,
    email,
    password1,
    password2,
  });
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
      }

      return response.data.user;
    });
};

export const logout = async () => {
  try {
    await api.post(`${AUTH_URL}logout/`, {}, {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      }
    });
    localStorage.removeItem('user');
    window.location.href = '/';
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
