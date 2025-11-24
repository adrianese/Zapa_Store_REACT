import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "./RegisterLogin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const obtenerUsuarioPorCredenciales = async (email, password) => {
    try {
      const res = await fetch(
        "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
      );

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La respuesta no es JSON");
      }

      const usuarios = await res.json();
      return usuarios.find((u) => u.email === email && u.password === password);
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuario = await obtenerUsuarioPorCredenciales(email, password);

      if (!usuario) {
        Swal.fire({
          icon: "warning",
          title: t("login.alerts.notFound.title"),
          text: t("login.alerts.notFound.text"),
          showCancelButton: true,
          confirmButtonText: t("login.alerts.notFound.confirm"),
          cancelButtonText: t("login.alerts.notFound.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/register");
          }
        });
        return;
      }

      const ok = await login(email, password);
      if (!ok) {
        Swal.fire({
          icon: "error",
          title: t("login.alerts.authError.title"),
          text: t("login.alerts.authError.text"),
        });
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", usuario.rol);

      if (usuario.rol === "admin") {
        navigate("/admin/board");
      } else {
        navigate("/carrito");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("login.alerts.error.title"),
        text: t("login.alerts.error.text"),
      });
    }
  };

  return (
    <div className="formulario-seccion">
      <h2>{t("login.title")}</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={t("login.fields.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t("login.fields.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="form-actions">
          <button className="boton-verde" type="submit">
            {t("login.submit")}
          </button>
        </div>
      </form>
      <p className="link-text">
        {t("login.registerPrompt")}{" "}
        <Link to="/register">{t("login.registerLink")}</Link>
      </p>
    </div>
  );
};

export default Login;
