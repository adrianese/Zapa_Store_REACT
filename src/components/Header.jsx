import './header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';


const Header = () => {
  const { carrito } = useContext(CarritoContext);

  return (
    <header className="header">
      <div className="contenedor contenido-header">
        <div className="barra">
          <Link to="/" className='link-h1'>
            <h1 className="titulo-header">
              ZAPA <span>Store</span>
            </h1>
          </Link>
          <nav className="navegacion">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
            <Link className="carrito" to="/carrito" id="icono-carrito">
              Carrito 🛒 <span id="carrito-contador">{carrito.length}</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;