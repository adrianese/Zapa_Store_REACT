import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Buscador.css";

const Buscador = ({ productos, onFiltrar, resetPagina }) => {
  const { t } = useTranslation();

  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [actividadSeleccionada, setActividadSeleccionada] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("");

  const [marcas, setMarcas] = useState([]);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const marcasUnicas = [...new Set(productos.map((p) => p.nombre))];
    const actividadesUnicas = [...new Set(productos.map((p) => p.actividad))];
    setMarcas(marcasUnicas);
    setActividades(actividadesUnicas);
  }, [productos]);

  useEffect(() => {
    let filtrados = productos.filter(
      (p) =>
        (marcaSeleccionada === "" || p.nombre === marcaSeleccionada) &&
        (actividadSeleccionada === "" || p.actividad === actividadSeleccionada)
    );

    if (ordenPrecio === "asc") {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === "desc") {
      filtrados.sort((a, b) => b.precio - a.precio);
    }

    onFiltrar(filtrados);
    resetPagina(); // cada vez que cambian filtros, vuelve a página 1
  }, [
    marcaSeleccionada,
    actividadSeleccionada,
    ordenPrecio,
    productos,
    onFiltrar,
    resetPagina,
  ]);

  return (
    <section className="formulario buscador">
      <h2>{t("search.title")}</h2>
      <h3>{t("search.subtitle")}</h3>

      <div className="input-buscador">
        <button
          className="boton-verde boton-redondeado"
          onClick={() => {
            setMarcaSeleccionada("");
            setActividadSeleccionada("");
            setOrdenPrecio("");
            onFiltrar(productos);
             resetPagina();
          }}
        >
          {t("search.allProducts")}
        </button>

        <label>
          {t("search.brand")}:
          <select
            value={marcaSeleccionada}
            onChange={(e) => setMarcaSeleccionada(e.target.value)}
          >
            <option value="">{t("search.allBrands")}</option>
            {marcas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t("search.activity")}:
          <select
            value={actividadSeleccionada}
            onChange={(e) => setActividadSeleccionada(e.target.value)}
          >
            <option value="">{t("search.allActivities")}</option>
            {actividades.map((act) => (
              <option key={act} value={act}>
                {act} {/* Se mantiene en inglés */}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t("search.price")}:
          <select
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="">{t("search.noOrder")}</option>
            <option value="asc">{t("search.priceAsc")}</option>
            <option value="desc">{t("search.priceDesc")}</option>
          </select>
        </label>
      </div>
    </section>
  );
};

export default Buscador;
