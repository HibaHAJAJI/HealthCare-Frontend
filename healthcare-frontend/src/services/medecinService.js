import API from "./axios";

const medecinService = {
  getAll: async (page = 0, size = 10) => {
    const response = await API.get(`/medecins?page=${page}&size=${size}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await API.get(`/medecins/${id}`);
    return response.data;
  },

  create: async (medecinData) => {
    const response = await API.post("/medecins", medecinData);
    return response.data;
  },

  update: async (id, medecinData) => {
    const response = await API.put(`/medecins/${id}`, medecinData);
    return response.data;
  },

  delete: async (id) => {
    await API.delete(`/medecins/${id}`);
  },

  search: async (username, page = 0, size = 10) => {
    const response = await API.get(
      `/medecins/triParNom?username=${username}&page=${page}&size=${size}`
    );
    return response.data;
  },
};

export default medecinService;