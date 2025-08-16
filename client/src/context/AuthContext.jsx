import { createContext, useContext, useState } from "react";
import api from "../api";

const Ctx = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem("auth") || "null"));

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
    return data;
  };
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return <Ctx.Provider value={{ auth, login, logout }}>{children}</Ctx.Provider>;
};
export const useAuth = () => useContext(Ctx);
