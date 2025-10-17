// src/pages/Carrito.jsx
import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Producto.css";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CarritoContext);
  const { login, logout, isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [formEnviado, setFormEnviado] = useState(false);

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const resumenPedido = carrito
    .map(
      (item, i) =>
        `${i + 1}. ${item.nombre} – ${item.imagen.split(".")[0]} – Talle: ${
          item.talle
        } – $${item.precio.toLocaleString("es-AR")}`
    )
    .join("\n");

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(nombre, email)) {
      // autenticado
    } else {
      alert("Por favor completá nombre y correo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("email", usuario.email);
    formData.append(
      "mensaje",
      `Tu Pedido:\n\n${resumenPedido}\n\nTotal: $${total.toLocaleString(
        "es-AR"
      )}`
    );

    try {
      const response = await fetch("https://formspree.io/f/xgvybglw", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("¡Compra confirmada!");
        setCarrito([]);
        localStorage.removeItem("carrito");
        logout();
        setFormEnviado(true);
        navigate("/");
      } else {
        alert("Error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo enviar el formulario.");
    }
  };

  if (formEnviado) return null;

  return (
    <div className="formulario-seccion contenedor">
      <h3 className="carrito-titulo">Resumen de Compra</h3>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          {/* Resumen visual del carrito */}
          <ul className="lista-carrito">
            {carrito.map((item, i) => (
              <li key={item.id} className="item-carrito">
                <strong>{i + 1}.</strong> {item.nombre} –{" "}
                {item.imagen.split(".")[0]} – Talle: {item.talle} – $
                {item.precio.toLocaleString("es-AR")}
              </li>
            ))}
          </ul>

          <p className="precio-item">
            <strong>Total:</strong> ${total.toLocaleString("es-AR")}
          </p>

          {/* Autenticación previa */}
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="formulario">
              <fieldset>
                <legend></legend>
                <h3 className="carrito-titulo">
                  Debes iniciar sesión y confirmar la compra
                </h3>

                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />

                <label htmlFor="email">Correo</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="submit"
                  value="Continuar"
                  className="boton-verde"
                />
              </fieldset>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="formulario">
              <fieldset>
                <legend>Confirmación de Pedido</legend>

                <p>
                  <strong>👤 Nombre:</strong> {usuario.nombre}
                </p>
                <p>
                  <strong>📧 Email:</strong> {usuario.email}
                </p>

                <label htmlFor="mensaje">Resumen del Pedido</label>
                <textarea
                  name="mensaje"
                  id="mensaje"
                  defaultValue={`Tu Pedido:\n\n${resumenPedido}\n\nTotal: $${total.toLocaleString(
                    "es-AR"
                  )}`}
                  readOnly
                  required
                  rows="6"
                />
              </fieldset>

              <input
                type="submit"
                value="Confirmar Compra"
                className="boton-verde"
              />
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Carrito;
