import React, { useEffect, useState } from "react";
import "./CarritoModal.css";

const CarritoModal = ({
  carrito,
  onEliminar,
  onVaciar,
  onCerrar,
  onConfirmar,
}) => {
  const [visible, setVisible] = useState(false);
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onCerrar, 300); // espera animación de salida
    }, 4000);
    return () => clearTimeout(timeout);
  }, [onCerrar]);

  return (
    <div
      className={`modal-carrito-overlay ${visible ? "fade-in" : "fade-out"}`}
    >
      <div
        className={`modal-carrito-contenido ${
          visible ? "slide-in" : "slide-out"
        }`}
      >
        <button className="cerrar-modal" onClick={onCerrar}>
          ×
        </button>
        <h2>Resumen del Carrito</h2>

        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="lista-carrito">
              {carrito.map((item, i) => (
                <li key={item.id} className="item-carrito">
                  <img
                    src={`img/${item.imagen}`}
                    alt={item.nombre}
                    className="miniatura-carrito"
                    title={`Modelo: ${item.imagen.split(".")[0]}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "img/default.png";
                    }}
                  />
                  <div className="detalle-carrito-linea">
                    <span className="marca-modelo">
                      <strong>{i + 1}.</strong> {item.nombre} –{" "}
                      {item.imagen.split(".")[0]}
                    </span>
                    <span className="precio-item">
                      ${item.precio.toLocaleString("es-AR")}
                    </span>
                    <span className="talle-item">Talle: {item.talle}</span>
                  </div>
                  <button
                    className="boton-eliminar"
                    onClick={() => onEliminar(item.id)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

            <p className="total-carrito">
              <strong>Total:</strong>{" "}
              <span className="precio-total">
                ${total.toLocaleString("es-AR")}
              </span>
            </p>

            <div className="acciones-carrito">
              <button className="boton-amarillo-block" onClick={onVaciar}>
                Vaciar Carrito
              </button>
              <button className="boton-amarillo-block" onClick={onConfirmar}>
                Confirmar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarritoModal;
