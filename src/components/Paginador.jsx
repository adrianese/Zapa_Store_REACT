// src/components/Paginador.js
import React from "react";
import "./Paginador.css";

const Paginador = ({
  totalItems,
  itemsPorPagina,
  paginaActual,
  onPageChange,
}) => {
  const totalPaginas = Math.min(Math.ceil(totalItems / itemsPorPagina), 5); // máximo 5 páginas
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className="paginador">
      {paginas.map((num) => (
        <button
          key={num}
          className={`pagina ${paginaActual === num ? "activo" : ""}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Paginador;
