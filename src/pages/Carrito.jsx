import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import "./Producto.css";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CarritoContext);
  const { login, logout, isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formEnviado, setFormEnviado] = useState(false);

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const resumenPedido = carrito
    .map(
      (item, i) =>
        `${i + 1}. ${item.nombre} – ${item.imagen.split(".")[0]} – ${t(
          "cart.size"
        )}: ${item.talle} – $${item.precio.toLocaleString("es-AR")}`
    )
    .join("\n");

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultado = await login(email, password, "usuario");

    if (!resultado || !resultado.exito) {
      Swal.fire({
        icon: "error",
        title: t("cart.alerts.authError.title"),
        text: resultado?.mensaje || t("cart.alerts.authError.text"),
      });
      return;
    }

    if (resultado.rol === "admin") {
      Swal.fire({
        icon: "error",
        title: t("cart.alerts.admin.title"),
        text: t("cart.alerts.admin.text"),
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/admin");
      return;
    }

    if (resultado.rol === "usuario") {
      Swal.fire({
        icon: "success",
        title: t("cart.alerts.welcome.title"),
        text: t("cart.alerts.welcome.text"),
        timer: 1500,
        showConfirmButton: false,
      });
      // No redirigimos: se mostrará el formulario de confirmación
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !usuario.id || !usuario.email) {
      Swal.fire("Error", t("cart.alerts.noUser"), "error");
      return;
    }

    const nuevoPedido = {
      id: `pedido${Date.now()}`,
      fecha: new Date().toISOString().split("T")[0],
      productos: carrito.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        imagen: item.imagen,
        actividad: item.actividad,
        talle: item.talle,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      total,
      estado: "pendiente",
      factura: `F001-${Math.floor(Math.random() * 100000)
        .toString()
        .padStart(8, "0")}`,
    };

    try {
      const updateRes = await fetch(
        `https://68e448c88e116898997b75e3.mockapi.io/api/productos/users/${usuario.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...usuario,
            pedidos: [...(usuario.pedidos || []), nuevoPedido],
          }),
        }
      );

      if (updateRes.ok) {
        Swal.fire({
          title: t("cart.alerts.success.title"),
          icon: "success",
        });

        setCarrito([]);
        localStorage.removeItem("carrito");
        setFormEnviado(true);
        navigate("/mis-compras");
        setTimeout(() => logout(), 100000);
      } else {
        Swal.fire("Error", t("cart.alerts.submitError"), "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", t("cart.alerts.submitError"), "error");
    }
  };

  if (formEnviado) return null;

  return (
    <div className="text-center div-base">
      <h2 className="carrito-titulo">{t("cart.title")}</h2>

      {carrito.length === 0 ? (
        <p>{t("cart.empty")}</p>
      ) : (
        <>
          <ul className="lista-carrito">
            {carrito.map((item, i) => (
              <li key={`${item.id}-${i}`} className="item-carrito">
                <strong>{i + 1}.</strong> {item.nombre} –{" "}
                {item.imagen.split(".")[0]} – {t("cart.size")}: {item.talle} – $
                {item.precio.toLocaleString("es-AR")}
              </li>
            ))}
          </ul>

          <p className="precio-item">
            <strong>{t("cart.total")}:</strong> ${total.toLocaleString("es-AR")}
          </p>

          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="formulario form-container">
              <fieldset>
                <h3 className="carrito-titulo">{t("cart.loginPrompt")}</h3>

                <label htmlFor="email">{t("cart.email")}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="password">{t("cart.password")}</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <input
                  type="submit"
                  value={t("cart.continue")}
                  className="boton-verde"
                />
              </fieldset>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="formulario form-container">
              <fieldset>
                <legend>{t("cart.confirmation")}</legend>
                <p>
                  <strong>{t("cart.name")}:</strong> {usuario.nombre}
                </p>
                <p>
                  <strong>📧 {t("cart.email")}:</strong> {usuario.email}
                </p>

                <label htmlFor="mensaje">{t("cart.summary")}</label>
                <textarea
                  name="mensaje"
                  id="mensaje"
                  defaultValue={`${t(
                    "cart.yourOrder"
                  )}:\n\n${resumenPedido}\n\n${t(
                    "cart.total"
                  )}: $${total.toLocaleString("es-AR")}`}
                  readOnly
                  required
                  rows="6"
                />
              </fieldset>

              <input
                type="submit"
                value={t("cart.confirm")}
                className="boton-verde"
              />
            </form>
          )}
        </>
      )}

      
        <p className="link-text">
          {t("cart.noAccount")}{" "}
          <Link to="/register" className="boton-verde">
            {t("cart.register")}
          </Link>
        </p>
     
    </div>
  );
};

export default Carrito;
