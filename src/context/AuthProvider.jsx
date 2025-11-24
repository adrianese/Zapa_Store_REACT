import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(
        "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
      );
      if (!res.ok) throw new Error("Error al obtener usuarios");

      const usuarios = await res.json();
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.password === password
      );

      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
        return {
          exito: true,
          rol: usuarioEncontrado.rol || "usuario",
          mensaje: "",
        };
      }

      return {
        exito: false,
        rol: null,
        mensaje: "Usuario no encontrado o credenciales incorrectas.",
      };
    } catch (error) {
      console.error("Error en login:", error);
      return {
        exito: false,
        rol: null,
        mensaje: "Error de conexión con el servidor.",
      };
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const isAuthenticated = !!usuario;

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
