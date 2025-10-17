// src/context/AuthProvider.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({ nombre: "", email: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const guardado = localStorage.getItem("usuario");
    if (guardado) {
      const datos = JSON.parse(guardado);
      if (datos.nombre && datos.email) {
        setUsuario(datos);
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [isAuthenticated, usuario]);

  const login = (nombre, email) => {
    const nombreValido = nombre?.trim();
    const emailValido = email?.trim();

    if (nombreValido && emailValido) {
      setUsuario({ nombre: nombreValido, email: emailValido });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario({ nombre: "", email: "" });
    setIsAuthenticated(false);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
