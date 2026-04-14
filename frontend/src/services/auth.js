import axios from "axios";

const API = "http://localhost:5000/auth";

export const register = (data) => {
    return axios.post(`${API}/register`, data);
}

export const login = (data) => {
  return axios.post(`${API}/login`, data);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};