import axios from "axios";

const API_URL = "http://localhost:8000/users/";

export const register = (username: string, email: string, password1: string, password2: string) => {
  return axios.post(API_URL + "register/", {
    username,
    email,
    password1,
    password2,
  });
};

export const login = (username: string, email: string, password: string) => {
  return axios
    .post(API_URL + "login/", {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data.user;
    });
};

export const logout = async () => {
  try {
    await axios.post(API_URL + 'logout/');
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