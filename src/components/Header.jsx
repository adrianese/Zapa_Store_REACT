import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { useAuth } from "../context/AuthProvider";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { carrito } = useContext(CarritoContext);
  const { isAuthenticated, usuario, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/productos");
  };

  return (
    <header className="header">
      <div className="contenedor contenido-header">
        <div className="barra">
          <NavLink to="/" className="link-h1">
            <h1 className="titulo-header">
              ZAPA <span className="estilo-titulo">Store</span>
            </h1>
          </NavLink>

          <nav className="navegacion">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "activo" : "")}
              end
            >
              {t("navbar.home")}
            </NavLink>
            <NavLink
              to="/productos"
              className={({ isActive }) => (isActive ? "activo" : "")}
            >
              {t("navbar.products")}
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "activo" : "")}
            >
              {t("navbar.login")}
            </NavLink>
            <NavLink
              to="/contacto"
              className={({ isActive }) => (isActive ? "activo" : "")}
            >
              {t("navbar.contact")}
            </NavLink>
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                isActive ? "carrito activo" : "carrito"
              }
              id="icono-carrito"
            >
              {t("navbar.cart")}{" "}
              <span id="carrito-contador">{carrito.length}</span>
            </NavLink>
            <LanguageSelector /> {/* Selector de idioma minimalista */}
          </nav>

          {isAuthenticated && (
            <button className="btn btn-danger" onClick={handleLogout}>
              {t("navbar.logout")} ({usuario.email})
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
