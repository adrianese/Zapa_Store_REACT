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
import Formulario from "../components/Formulario";


function Contacto() {
  return (
    <main className="contenedor seccion">
      <Formulario
        titulo="Llene el Formulario de Contacto"
        action="https://formspree.io/f/xrbkooqa"
        campos={[
          {
            label: "Nombre",
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
          {
            label: "Teléfono",
            name: "telefono",
            type: "tel",
            placeholder: "Tu Teléfono",
            required: false,
          },
        ]}
        mensaje=""
        botonTexto="Enviar"
        incluirSuscripcion={true}
      />
      ;{/* contenido del formulario */}
    </main>
  );
}


export default Contacto;


   import React from 'react';
   import SeccionProductos from '../components/SeccionProductos';
   import CarouselExclusivos from "../components/CarouselExclusivos";


const VideoBanner = () => {
  return (
    <div className="contenedor seccion">
      <div className="video">
        <div className="overlay">
          <video autoPlay muted loop poster="img/banner.png">
            <source src="video/zapastore.mp4" type="video/mp4" />
            Tu navegador no soporta el video HTML5.
          </video>
        </div>
      </div>

      <SeccionProductos />
      <CarouselExclusivos />
    
    </div>
  );
};

export default VideoBanner;
import React from 'react'

function Nosotros() {
  return (
    <main className="contenedor seccion">
      <h2>Nosotros</h2>
    </main>
  )
}

export default Nosotros

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import ProductoCard from "../components/ProductoCard";
import Buscador from "../components/Buscador";
import ModalComparacion from "../components/ModalComparacion";
import CarritoModal from "../components/CarritoModal";
import "../components/ProductoCard.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mostrarModalComparacion, setMostrarModalComparacion] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const navigate = useNavigate();

  const { carrito, setCarrito } = useContext(CarritoContext);
  const [mostrarFlecha, setMostrarFlecha] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const umbral = document.documentElement.scrollHeight * 0.35;
      setMostrarFlecha(window.scrollY > umbral);
    };

    

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cargar productos desde JSON
  useEffect(() => {
    fetch("/datos.json")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.datos);
        setProductosFiltrados(data.datos);
      });
  }, []);

  // Ocultar botón flotante al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const boton = document.getElementById("boton-ver-carrito");
      if (!boton) return;
      const scrollY = window.scrollY;
      boton.style.opacity = scrollY > 300 ? "0" : "1";
      boton.style.pointerEvents = scrollY > 300 ? "none" : "auto";
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle selección para comparación
  const toggleSeleccion = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Toggle carrito
  const toggleCarrito = (producto, talle) => {
    const existe = carrito.find((p) => p.id === producto.id);
    if (existe) {
      setCarrito(carrito.filter((p) => p.id !== producto.id));
    } else {
      if (!producto.disponible)
        return alert("Este producto no está disponible.");
      if (!talle) return alert("Seleccioná un talle antes de continuar.");
      setCarrito([...carrito, { ...producto, talle }]);
      setMostrarCarrito(true);
    }
  };

  // Eliminar individualmente
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Confirmar compra
  const confirmarCompra = () => {
    navigate("/carrito");
  };

  const productosSeleccionados = productosFiltrados.filter((p) =>
    seleccionados.includes(p.id)
  );

  return (
    <div className="contenedor seccion">
      <Buscador productos={productos} onFiltrar={setProductosFiltrados} />

      <div className="contenedor-anuncios">
        {productosFiltrados.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            seleccionado={seleccionados.includes(producto.id)}
            enCarrito={carrito.some((p) => p.id === producto.id)}
            onSeleccionar={toggleSeleccion}
            onToggleCarrito={toggleCarrito}
          />
        ))}
      </div>

      {seleccionados.length >= 2 && (
        <button
          className="boton-comparar-flotante"
          onClick={() => setMostrarModalComparacion(true)}
        >
          Comparar Seleccionados
        </button>
      )}

      {mostrarModalComparacion && (
        <ModalComparacion
          productos={productosSeleccionados}
          onCerrar={() => {
            setMostrarModalComparacion(false);
            setSeleccionados([]);
          }}
        />
      )}
      <div
        className={`flotante ${mostrarFlecha ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src="img/uparrow.svg" alt="Ir arriba" />
      </div>

      {mostrarCarrito && (
        <CarritoModal
          carrito={carrito}
          onEliminar={eliminarDelCarrito}
          onVaciar={vaciarCarrito}
          onCerrar={() => setMostrarCarrito(false)}
          onConfirmar={confirmarCompra}
        />
      )}

      {carrito.length > 0 && (
        <button
          className={`boton-ver-carrito-flotante ${
            mostrarCarrito ? "oculto" : ""
          }`}
          onClick={() => setMostrarCarrito(true)}
          id="boton-ver-carrito"
        >
          🛒 Ver Carrito
        </button>
      )}
    </div>
  );
};

export default Productos;
