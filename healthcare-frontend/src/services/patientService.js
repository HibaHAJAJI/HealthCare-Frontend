import API from "./axios";

const patientService = {
  getAll: async (page = 0, size = 10) => {
    const response = await API.get(`/patients?page=${page}&size=${size}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await API.get(`/patients/${id}`);
    return response.data;
  },

  create: async (patientData) => {
    const response = await API.post("/patients", patientData);
    return response.data;
  },

  update: async (id, patientData) => {
    const response = await API.put(`/patients/${id}`, patientData);
    return response.data;
  },

  delete: async (id) => {
    await API.delete(`/patients/${id}`);
  },

  search: async (username, page = 0, size = 10) => {
    const response = await API.get(
      `/patients/triParNom?username=${username}&page=${page}&size=${size}`
    );
    return response.data;
  },
};

export default patientService;