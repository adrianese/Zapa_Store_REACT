import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ProductoCard.css";

const ProductoCard = ({ producto, onToggleCarrito }) => {
  const [talle, setTalle] = useState("");
  const { t } = useTranslation();

  return (
    <div className="producto">
      <div className="encabezado-card"></div>

      <div className="anuncio">
        <img
          src={`img/${producto.imagen}`}
          alt={producto.nombre}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "img/default.png";
          }}
        />

        <div className="contenido-anuncio">
          <Link to={`/producto/${producto.id}`} className="boton-detalle">
            {t("product.details")}
          </Link>
          <h2 className="producto-nombre">{producto.nombre.toUpperCase()}</h2>
          <p className="modelo">
            {t("product.model")}: {producto.imagen.split(".")[0]}
          </p>
          <p className="precio">$ {producto.precio.toLocaleString("es-AR")}</p>

          <div className="iconos-caracteristicas icono-alinear">
            <div className="icono-actividad">
              <img
                src={`img/${producto.actividad.replaceAll(" ", "_")}.svg`}
                alt={producto.actividad}
                title={producto.actividad}
              />
              <p className="modelo">{producto.actividad}</p>{" "}
              {/* Se mantiene en inglés */}
            </div>

            <div className="estado-disponible">
              <img
                src={`img/${producto.disponible ? "true" : "false"}.svg`}
                alt={
                  producto.disponible
                    ? t("product.available")
                    : t("product.unavailable")
                }
              />
              <p className="modelo">
                {producto.disponible
                  ? t("product.available")
                  : t("product.unavailable")}
              </p>
            </div>
          </div>

          <div className="selector-talle">
            <label htmlFor={`talle-${producto.id}`} className="label-talle">
              {t("product.size")}
            </label>
            <select
              className="select-talle"
              id={`talle-${producto.id}`}
              value={talle}
              onChange={(e) => setTalle(e.target.value)}
            >
              <option value="" disabled hidden>
                {t("product.selectSize")}
              </option>
              {[...Array(11)].map((_, i) => (
                <option key={i} value={35 + i}>
                  {35 + i}
                </option>
              ))}
            </select>
          </div>

          <button
            className="boton-naranja"
            onClick={() => {
              onToggleCarrito(producto, talle);
              setTalle("");
            }}
          >
            {t("product.addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
