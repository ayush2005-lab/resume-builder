import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("rb_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  async function login(email, password) {
    const { data } = await axiosClient.post("/auth/login", { email, password });
    localStorage.setItem("rb_token", data.token);
    localStorage.setItem("rb_user", JSON.stringify(data));
    setUser(data);
    return data;
  }

  async function register(name, email, password) {
    const { data } = await axiosClient.post("/auth/register", { name, email, password });
    localStorage.setItem("rb_token", data.token);
    localStorage.setItem("rb_user", JSON.stringify(data));
    setUser(data);
    return data;
  }

  function logout() {
    localStorage.removeItem("rb_token");
    localStorage.removeItem("rb_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
