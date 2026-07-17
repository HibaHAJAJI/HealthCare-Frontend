import API from './axiosConfig';

const medecinService = {
  getAll: async () => {
    const response = await API.get('/medecins');
    return response.data;
  },

  getById: async (id) => {
    const response = await API.get(`/medecins/${id}`);
    return response.data;
  },

  create: async (medecinData) => {
    const response = await API.post('/medecins', medecinData);
    return response.data;
  },

  update: async (id, medecinData) => {
    const response = await API.put(`/medecins/${id}`, medecinData);
    return response.data;
  },

  delete: async (id) => {
    const response = await API.delete(`/medecins/${id}`);
    return response.data;
  }
};

export default medecinService;