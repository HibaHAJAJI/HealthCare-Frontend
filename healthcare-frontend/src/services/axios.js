import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      const cleanToken = token.replace(/^"|"$/g, "");
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } else if (status === 403) {
      console.error("Erreur 403: Accès refusé (Droits insuffisants)");
    } else if (status === 400) {
      console.error("Erreur 400: Requête invalide");
    } else if (status === 404) {
      console.error("Erreur 404: Ressource introuvable");
    } else if (status >= 500) {
      console.error("Erreur 500: Erreur serveur interne");
    }

    return Promise.reject(error);
  }
);

export default API;