import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import Formulario from "../components/Formulario";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CarritoContext);

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const resumenPedido = carrito
    .map(
      (item, i) =>
        `${i + 1}. ${item.nombre} – ${item.imagen.split(".")[0]} – Talle: ${
          item.talle
        } – $${item.precio.toLocaleString("es-AR")}`
    )
    .join("\n");

  const handleSuccess = () => {
    alert("¡Compra confirmada!");
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <div className="seccion contenedor">
      <h2>Resumen de Compra</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {carrito.map((item, i) => (
              <li key={item.id}>
                <strong>{i + 1}.</strong> {item.nombre} –{" "}
                {item.imagen.split(".")[0]} – Talle: {item.talle} – $
                {item.precio.toLocaleString("es-AR")}
              </li>
            ))}
          </ul>

          <p>
            <strong>Total:</strong> ${total.toLocaleString("es-AR")}
          </p>

          <Formulario
            titulo="Confirma tu Compra:"
            action="https://formspree.io/f/xgvybglw"
            campos={[
              {
                label: "Nombre Completo",
                name: "nombre",
                type: "text",
                placeholder: "Tu Nombre",
                required: true,
              },
              {
                label: "E-mail",
                name: "email",
                type: "email",
                placeholder: "Tu Email",
                required: true,
              },
            ]}
            mensaje={`Tu Pedido:\n\n${resumenPedido}\n\nTotal: $${total.toLocaleString(
              "es-AR"
            )}`}
            botonTexto="Confirmar"
            soloLectura={true}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </div>
  );
};

export default Carrito;
