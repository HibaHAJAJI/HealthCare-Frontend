import API from "./axios";

const userService = {
  getCurrentUser: async () => {
    const response = await API.get("/users/me");
    return response.data;
  },

  updateCurrentUser: async (data) => {
    const response = await API.put("/users/me", data);
    return response.data;
  },
};

export default userService;