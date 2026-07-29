import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(() => {
    try {
      const savedToken = localStorage.getItem("token");
      return savedToken
        ? savedToken.replace(/^"|"$/g, "")
        : null;
    } catch {
      return null;
    }
  });


  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });


  const login = (userData, jwtToken) => {

    const cleanToken = jwtToken.replace(/^"|"$/g, "");

    setUser(userData);
    setToken(cleanToken);

    localStorage.setItem("token", cleanToken);
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  };


  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};