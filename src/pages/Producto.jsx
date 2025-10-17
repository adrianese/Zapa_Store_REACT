import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Producto.css";

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [detallesMarca, setDetallesMarca] = useState(null);

  useEffect(() => {
    fetch("/datos.json")
      .then((res) => res.json())
      .then((data) => {
        const productoEncontrado = data.datos.find(
          (p) => p.id === parseInt(id)
        );
        setProducto(productoEncontrado);
      });
  }, [id]);

  useEffect(() => {
    if (producto) {
      fetch("/detalles.json")
        .then((res) => res.json())
        .then((data) => {
          const detalle = data.productos_deportivos.find(
            (d) => d.marca === producto.nombre
          );
          setDetallesMarca(detalle);
        });
    }
  }, [producto]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="contenedor seccion contenido-principal">
      <div className="producto-detalle">
        <div className="producto-info">
          <h1>{producto.nombre.toUpperCase()}</h1>
          <p className="precio">$ {producto.precio.toLocaleString("es-AR")}</p>
          <p>
            <strong>Modelo:</strong> {producto.imagen.split(".")[0]}
          </p>
          <div className="producto-inf">
            <p>
              <strong>Actividad:</strong> {producto.actividad}
            </p>
            <p>
              <strong>Disponibilidad:</strong>{" "}
              {producto.disponible ? "En stock" : "Agotado"}
            </p>
            <p>
              <strong>Talles disponibles:</strong> 35 al 44
            </p>
          </div>
        </div>

        <div className="producto-contenido">
          <div className="producto-imagen">
            <img src={`/img/${producto.imagen}`} alt={producto.nombre} />
          </div>
          <div className="producto-descripcion">
            {detallesMarca && (
              <div className="producto-detalles-extra">
                <p>
                  <strong>Actividad más recomendada</strong>
                </p>

                {detallesMarca.actividad_apta.map((texto, index) => (
                  <p className="p-producto" key={`act-${index}`}>
                    {texto}
                  </p>
                ))}
                <p>
                  <strong>Beneficios y materiales</strong>
                </p>

                {detallesMarca.beneficios_materiales.map((texto, index) => (
                  <p className="p-producto" key={`mat-${index}`}>
                    {texto}
                  </p>
                ))}
              </div>
            )}

            <button
              className="boton-verde"
              onClick={() => window.history.back()}
            >
              ← Volver a productos
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Producto;
