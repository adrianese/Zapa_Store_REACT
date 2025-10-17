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
  /* const toggleSeleccion = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }; */

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
            /* onSeleccionar={toggleSeleccion} */
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
