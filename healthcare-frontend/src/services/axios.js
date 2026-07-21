import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6InNlbGVuYTEzNTIyMiIsImlhdCI6MTc4NDU4NzQxMCwiZXhwIjoxNzg0NjczODEwfQ.TQ5dK8K2LBD7ZS_RgDQjPlWLpe6hijZ8npzCmUut0og";

API.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TOKEN}`;
  return config;
});

export default API;