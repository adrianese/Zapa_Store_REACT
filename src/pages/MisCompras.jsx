import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthProvider";
import "./MisCompras.css";

const MisCompras = () => {
  const { usuario, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      if (!isAuthenticated) return;

      try {
        const res = await fetch(
          `https://68e448c88e116898997b75e3.mockapi.io/api/productos/users/${usuario.id}`
        );
        const data = await res.json();
        setPedidos(data.pedidos || []);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        Swal.fire({
          icon: "error",
          title: t("orders.alerts.error.title"),
          text: t("orders.alerts.error.text"),
        });
      }
    };

    obtenerPedidos();
  }, [usuario, isAuthenticated, t]);

  if (!isAuthenticated) {
    return (
      <div className="container">
        <p>{t("orders.loginRequired")}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{t("orders.title")}</h2>
      {pedidos.length === 0 ? (
        <p>{t("orders.noOrders")}</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="card-pedido">
            <h3>
              {t("orders.invoice")}: {pedido.factura}
            </h3>
            <p>
              {t("orders.date")}: {pedido.fecha}
            </p>
            <p>
              {t("orders.status")}: {pedido.estado}
            </p>
            <p>
              {t("orders.total")}: ${pedido.total.toLocaleString("es-AR")}
            </p>
            <ul>
              {pedido.productos.map((prod, index) => (
                <li key={index}>
                  {prod.nombre} – {t("orders.model")}:{" "}
                  {prod.imagen.split(".")[0]} — {t("orders.size")}: {prod.talle}{" "}
                  – {t("orders.quantity")}: {prod.cantidad} – $
                  {prod.precio.toLocaleString("es-AR")}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MisCompras;
