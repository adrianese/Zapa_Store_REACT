// src/components/Paginador.jsx
import React from "react";
import styled from "styled-components";

const PaginadorWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const PaginaButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  font-size: 14px;

  &:hover {
    background: #e6e6e6;
    color: #333;
    border-color: #999;
  }

  ${({ activo }) =>
    activo &&
    `
    background: #007bff;
    color: white;
    font-weight: bold;
    border-color: #007bff;
  `}
`;

const Paginador = ({
  totalItems,
  itemsPorPagina,
  paginaActual,
  onPageChange,
}) => {
  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);

  // 🔑 Siempre mostramos al menos la página 1
  const paginas = Array.from({ length: totalPaginas || 1 }, (_, i) => i + 1);

  return (
    <PaginadorWrapper>
      {paginas.map((num) => (
        <PaginaButton
          type="button"
          key={num}
          activo={paginaActual === num}
          onClick={() => onPageChange(num)}
        >
          {num}
        </PaginaButton>
      ))}
    </PaginadorWrapper>
  );
};

export default Paginador;
