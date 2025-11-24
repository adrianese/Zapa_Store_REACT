import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "./RegisterLogin.css";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const verificarEmailExistente = async (email) => {
    const res = await fetch(
      "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
    );
    const usuarios = await res.json();
    return usuarios.find((u) => u.email === email);
  };

  const registrarUsuario = async (usuario) => {
    const res = await fetch(
      "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(usuario),
      }
    );
    return res.ok ? await res.json() : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre,
      email,
      password,
      rol: "usuario",
      pedidos: [],
    };

    try {
      const existe = await verificarEmailExistente(email);
      if (existe) {
        Swal.fire({
          icon: "warning",
          title: t("register.alerts.emailExists.title"),
          text: t("register.alerts.emailExists.text"),
          confirmButtonText: t("register.alerts.emailExists.button"),
        }).then(() => navigate("/login"));
        return;
      }

      const resultado = await registrarUsuario(nuevoUsuario);
      if (resultado?.id) {
        Swal.fire({
          icon: "success",
          title: t("register.alerts.success.title"),
          text: t("register.alerts.success.text"),
          confirmButtonText: t("register.alerts.success.button"),
        }).then(() => navigate("/login"));
      } else {
        throw new Error("No se pudo registrar");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: t("register.alerts.error.title"),
        text: t("register.alerts.error.text"),
      });
    }
  };

  return (
    <div className="formulario-seccion">
      <h2>{t("register.title")}</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t("register.fields.name")}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder={t("register.fields.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t("register.fields.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="form-actions">
          <button type="submit" className="boton-verde">
            {t("register.submit")}
          </button>
        </div>
      </form>
      <p className="link-text">
        {t("register.loginPrompt")}{" "}
        <Link to="/login">{t("register.loginLink")}</Link>
      </p>
    </div>
  );
};

export default Register;
