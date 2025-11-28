import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import ProdCard from "../../components/admin/ProdCard";
import { useAuth } from "../../context/AuthProvider";
// Eliminamos la importación del CSS: import "./ProductList.css";

// ==========================================================
// DEFINICIÓN DE STYLED COMPONENTS
// ==========================================================

// Estilo Base para el Contenedor Principal
const ListContainer = styled.div`
  padding: 20px;
`;

// Estilo Base para los Botones de Acción de Administración
const ButtonBase = css`
  font-weight: 700;
  margin-top: 2.5rem;
  padding: 1rem 3rem;
  text-align: center;
  text-decoration: none;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &.btn-admin {
    margin-left: 4rem;
  }
`;

// Estilo para el botón amarillo (Crear Producto / Ver Órdenes)
const BotonAmarillo = styled.button`
  ${ButtonBase}
  background-color: #e08709;

  &:hover {
    background-color: #c77808;
  }
`;

// Estilo para los textos de estado
const StatusText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;

  &.loading-text {
    color: #007bff;
    background-color: #e6f0ff;
  }
  &.error-text {
    color: #dc3545;
    background-color: #f8d7da;
  }
`;

// Estilo para la grilla de productos
const ProductosLista = styled.div`
  display: grid;
  /* Ajuste para que se vea bien en diferentes tamaños */
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  justify-content: center;
  gap: 2rem;
  padding: 20px;
`;

// ==========================================================
//  COMPONENTE PRODUCTLIST
// ==========================================================

const ProductList = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsAndDetails = async () => {
      try {
        const [productsResponse, detailsResponse] = await Promise.all([
          fetch(
            "https://68e448c88e116898997b75e3.mockapi.io/api/productos/products"
          ),
          fetch("/detalles.es.json"),
        ]);

        if (!productsResponse.ok || !detailsResponse.ok) {
          throw new Error("Error al obtener productos o detalles");
        }

        const productsData = await productsResponse.json();
        const detailsData = await detailsResponse.json();

        const detallesArray = detailsData.productos_deportivos;

        if (!Array.isArray(detallesArray)) {
          throw new Error(
            "El archivo detalles.json no contiene un array válido en 'productos_deportivos'."
          );
        }

        const detallesMap = new Map(detallesArray.map((d) => [d.marca, d]));

        const productosConDetalles = productsData.map((p) => {
          const detalle = detallesMap.get(p.nombre);

          return {
            ...p,
            disponible: p.disponible === true || p.disponible === "true",
            actividadText:
              detalle?.actividad_apta?.[0] || "Sin descripción disponible.",
            materialesText:
              detalle?.beneficios_materiales?.[0] ||
              "Sin materiales especificados.",
          };
        });

        setProducts(productosConDetalles);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndDetails();
  }, []);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading)
    return (
      <StatusText className="loading-text">🔄 Cargando productos...</StatusText>
    );
  if (error)
    return <StatusText className="error-text">❌ Error: {error}</StatusText>;

  return (
    // Reemplazo <div className="product-list"> por <ListContainer>
    <ListContainer>
      <h2>Bienvenido, {usuario?.nombre}</h2>
      {/* Reemplazo el botón con BotonAmarillo y usamos .btn-admin en className */}
      <BotonAmarillo
        onClick={() => navigate("/admin/create")}
        className="btn-admin"
      >
        Crear Nuevo Producto
      </BotonAmarillo>
      {/* Cambio el botón con BotonAmarillo y usamos .btn-admin en className */}
      <BotonAmarillo
        onClick={() => navigate("/admin/orders")}
        className="btn-admin "
      >
        Ver Órdenes
      </BotonAmarillo>
      <h1>Lista de Productos</h1>
      {/* Cambio <div className="productos-lista"> por <ProductosLista> */}
      <ProductosLista>
        {products.map((product) => (
          <ProdCard
            key={product.id}
            producto={product}
            onDelete={handleDelete}
          />
        ))}
      </ProductosLista>
    </ListContainer>
  );
};

export default ProductList;
