import React, { useState } from 'react';
import "./ProductoCard.css";

const ProductoCard = ({
  producto,
  seleccionado,
  enCarrito,
  onSeleccionar,
  onToggleCarrito
}) => {
  const [talle, setTalle] = useState('');

  return (
    <div className="producto">
      <div className="encabezado-card">
        <label className="comparar-check">
          <input
            type="checkbox"
            checked={seleccionado}
            onChange={() => onSeleccionar(producto.id)}
          />
          comparar
        </label>
      </div>

      <div className="anuncio">
        <img
          src={`img/${producto.imagen}`}
          alt={producto.nombre}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'img/default.png';
          }}
        />

        <div className="contenido-anuncio">
          <h2 className="producto-nombre">{producto.nombre.toUpperCase()}</h2>
          <p className="modelo">modelo: {producto.imagen.split('.')[0]}</p>
          <p className="precio">$ {producto.precio.toLocaleString('es-AR')}</p>

          <div className="iconos-caracteristicas icono-alinear">
            <div className="icono-actividad">
              <img
                src={`img/${producto.actividad.replaceAll(' ', '_')}.svg`}
                alt={producto.actividad}
                title={producto.actividad}
              />
              <p className="modelo">{producto.actividad}</p>
            </div>
            <div className="estado-disponible">
              <img
                src={`img/${producto.disponible ? 'true' : 'false'}.svg`}
                alt={producto.disponible}
              />
              <p className="modelo">
                {producto.disponible ? 'disponible' : 'no disponible'}
              </p>
            </div>
          </div>

          <div className="selector-talle">
            <label htmlFor={`talle-${producto.id}`} className="label-talle">
              Talle
            </label>
            <select
              id={`talle-${producto.id}`}
              value={talle}
              onChange={(e) => setTalle(e.target.value)}
            >
              <option value="" disabled hidden>
                Seleccione Talle
              </option>
              {[...Array(11)].map((_, i) => (
                <option key={i} value={35 + i}>
                  {35 + i}
                </option>
              ))}
            </select>
          </div>

          <button
            className="boton-amarillo-block"
            style={{
              backgroundColor: enCarrito ? '#ffd6cc' : '#e08709',
              color: enCarrito ? '#333' : '#fff'
            }}
            onClick={() => onToggleCarrito(producto, talle)}
          >
            {enCarrito ? 'Quitar del carrito' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;