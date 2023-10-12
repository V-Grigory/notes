import axios from "axios";

const loginConfig = {
  baseURL: "/login", // process.env.VEU_APP_BASE_URL
  headers: {
    "Content-Type": "application/json",
  },
};

export const LoginAPIInstance = axios.create(loginConfig);

const defaultConfig = {
  baseURL: "/", // process.env.VEU_APP_BASE_URL
  headers: {
    "Content-Type": "application/json",
  },
};

export const DefaultAPIInstance = axios.create(defaultConfig);
