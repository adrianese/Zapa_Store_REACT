import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "./CarritoModal.css";

const CarritoModal = ({
  carrito,
  setCarrito,
  onEliminar,
  onVaciar,
  onCerrar,
  onConfirmar,
}) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onCerrar, 300);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [onCerrar]);

  const agregarItem = (item) => {
    Swal.fire({
      title: t("modal.selectSize"),
      input: "select",
      inputOptions: Object.fromEntries(
        Array.from({ length: 11 }, (_, i) => {
          const talle = (35 + i).toString();
          return [talle, talle];
        })
      ),
      inputPlaceholder: t("modal.size"),
      showCancelButton: true,
      confirmButtonText: t("modal.add"),
      cancelButtonText: t("modal.cancel"),
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const talleNuevo = result.value;
        const existe = carrito.find(
          (p) => p.id === item.id && p.talle === talleNuevo
        );
        if (existe) {
          existe.cantidad += 1;
          setCarrito([...carrito]);
        } else {
          setCarrito([...carrito, { ...item, talle: talleNuevo, cantidad: 1 }]);
        }
      }
    });
  };

  const quitarItem = (item) => {
    const index = carrito.findIndex(
      (p) => p.id === item.id && p.talle === item.talle
    );
    if (index !== -1) {
      const nuevoCarrito = [...carrito];
      if (nuevoCarrito[index].cantidad > 1) {
        nuevoCarrito[index].cantidad -= 1;
      } else {
        nuevoCarrito.splice(index, 1);
      }
      setCarrito(nuevoCarrito);
    }
  };

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
        <h2>{t("modal.title")}</h2>

        {carrito.length === 0 ? (
          <p>{t("modal.empty")}</p>
        ) : (
          <>
            <ul className="lista-carrito">
              {carrito.map((item, i) => (
                <li key={`${item.id}-${item.talle}`} className="item-carrito">
                  <img
                    src={`img/${item.imagen}`}
                    alt={item.nombre}
                    className="miniatura-carrito"
                    title={`${t("modal.model")}: ${item.imagen.split(".")[0]}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "img/default.png";
                    }}
                  />
                  <div className="detalle-carrito-linea">
                    <span className="marca-modelo">
                      <span className="nombre">
                        {i + 1}.{item.nombre}
                      </span>
                      <span className="modelo">
                        {" "} {item.imagen.split(".")[0]}
                      </span>
                    </span>
                    <span className="precio-item">
                      ${item.precio.toLocaleString("es-AR")}
                    </span>
                    <span className="talle-item">
                      {t("modal.size")}: {item.talle}
                    </span>
                    <span className="cantidad-item">
                      {t("modal.quantity")}: {item.cantidad}
                    </span>

                    <div className="acciones-item">
                      <button
                        className="boton-cantidad"
                        onClick={() => agregarItem(item)}
                      >
                        ➕
                      </button>
                      <button
                        className="boton-cantidad"
                        onClick={() => quitarItem(item)}
                      >
                        ➖
                      </button>
                    </div>
                  </div>
                  <button
                    className="boton-eliminar"
                    onClick={() => onEliminar(item.id, item.talle)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

            <p className="total-carrito">
              <strong>{t("modal.total")}:</strong>{" "}
              <span className="precio-total">
                ${total.toLocaleString("es-AR")}
              </span>
            </p>

            <div className="acciones-carrito">
              <button className="boton-verde" onClick={onVaciar}>
                {t("modal.clear")}
              </button>
              <button className="boton-verde" onClick={onConfirmar}>
                {t("modal.confirm")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarritoModal;
