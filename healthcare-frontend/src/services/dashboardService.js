import API from "./axios";

const dashboardService = {
  getStats: async () => {
    const response = await API.get("/dashboard");
    return response.data;
  },
};

export default dashboardService;