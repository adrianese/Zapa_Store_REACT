import React from "react";
import { useTranslation } from "react-i18next";
import "./ModalComparacion.css";

const ModalComparacion = ({ productos, onCerrar }) => {
  const { t } = useTranslation();

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="cerrar-modal" onClick={onCerrar}>
          X
        </button>
        <h2>{t("comparison.title")}</h2>
        <div className="comparacion-grid">
          {productos.map((p) => (
            <div key={p.id} className="comparacion-item">
              <img src={`img/${p.imagen}`} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p>
                {t("comparison.activity")}: {p.actividad}
              </p>
              <p>
                {t("comparison.price")}: $ {p.precio.toLocaleString("es-AR")}
              </p>
              <p>
                {t("comparison.available")}:{" "}
                {p.disponible ? t("comparison.yes") : t("comparison.no")}
              </p>
            </div>
          ))}
        </div>
        <button className="boton-amarillo-block" onClick={onCerrar}>
          {t("comparison.close")}
        </button>
      </div>
    </div>
  );
};

export default ModalComparacion;
