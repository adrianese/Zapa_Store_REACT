import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import ProductoCard from "../components/ProductoCard";
import Buscador from "../components/Buscador";
import ModalComparacion from "../components/ModalComparacion";
import CarritoModal from "../components/CarritoModal";
import GuiaTallesModal from "../components/GuiaTallesModal";
import Paginador from "../components/Paginador"; 

import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "../components/ProductoCard.css";


const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1); // estado de página
  const itemsPorPagina = 8; // cantidad de productos por página
  const [seleccionados, setSeleccionados] = useState([]);

  const [mostrarModalComparacion, setMostrarModalComparacion] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarFlecha, setMostrarFlecha] = useState(false);
  const navigate = useNavigate();
  const { carrito, setCarrito } = useContext(CarritoContext);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const umbral = document.documentElement.scrollHeight * 0.35;
      setMostrarFlecha(window.scrollY > umbral);

      const boton = document.getElementById("boton-ver-carrito");
      if (boton) {
        boton.style.opacity = window.scrollY > 300 ? "0" : "1";
        boton.style.pointerEvents = window.scrollY > 300 ? "none" : "auto";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch(
          "https://68e448c88e116898997b75e3.mockapi.io/api/productos/products"
        );
        if (!respuesta.ok)
          throw new Error(`HTTP error! status: ${respuesta.status}`);
        const data = await respuesta.json();
        setProductos(data);
        setProductosFiltrados(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        Swal.fire({
          icon: "error",
          title: t("products.alerts.loadError.title"),
          text: t("products.alerts.loadError.text"),
        });
      }
    };
    obtenerProductos();
  }, [t]);

  const toggleCarrito = (producto, talle) => {
    if (!producto.disponible) {
      Swal.fire({
        icon: "error",
        title: t("products.alerts.unavailable.title"),
        text: t("products.alerts.unavailable.text"),
      });
      return;
    }

    if (!talle) {
      Swal.fire({
        icon: "warning",
        title: t("products.alerts.sizeRequired.title"),
        text: t("products.alerts.sizeRequired.text"),
      });
      return;
    }

    const existe = carrito.find(
      (p) => p.id === producto.id && p.talle === talle
    );

    if (existe) {
      Swal.fire({
        icon: "info",
        title: t("products.alerts.alreadyAdded.title"),
        text: t("products.alerts.alreadyAdded.text", { size: talle }),
      });
      return;
    }

    setCarrito([...carrito, { ...producto, talle, cantidad: 1 }]);
    setMostrarCarrito(true);
  };

  const eliminarDelCarrito = (id, talle) => {
    setCarrito(carrito.filter((p) => !(p.id === id && p.talle === talle)));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const confirmarCompra = () => {
    navigate("/carrito");
  };

  const productosSeleccionados = productosFiltrados.filter((p) =>
    seleccionados.includes(p.id)
  );

  // Calcular productos visibles según página
  const indexInicio = (paginaActual - 1) * itemsPorPagina;
  const indexFin = indexInicio + itemsPorPagina;
  const productosVisibles = productosFiltrados.slice(indexInicio, indexFin);

  return (
    <div className="contenedor seccion">
      <Buscador productos={productos} onFiltrar={setProductosFiltrados}  
      resetPagina={() => setPaginaActual(1)} />

      <GuiaTallesModal />
      <div className="contenedor-anuncios">
        {productosVisibles.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            seleccionado={seleccionados.includes(producto.id)}
            enCarrito={carrito.some((p) => p.id === producto.id)}
            onToggleCarrito={toggleCarrito}
          />
        ))}
      </div>

      <Paginador
        totalItems={productosFiltrados.length}
        itemsPorPagina={itemsPorPagina}
        paginaActual={paginaActual}
        onPageChange={setPaginaActual}
      />
      {seleccionados.length >= 2 && (
        <button
          className="boton-comparar-flotante"
          onClick={() => setMostrarModalComparacion(true)}
        >
          {t("products.compareButton")}
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
        <img src="img/uparrow.svg" alt={t("products.scrollTop")} />
      </div>
      {mostrarCarrito && (
        <CarritoModal
          carrito={carrito}
          setCarrito={setCarrito}
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
          🛒 {t("products.viewCart")}
        </button>
      )}
    </div>
  );
};

export default Productos;
