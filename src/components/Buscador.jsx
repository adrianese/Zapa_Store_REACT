import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import "./Buscador.css";

const Buscador = ({ productos, onFiltrar }) => {
  const { t } = useTranslation();

  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [actividadSeleccionada, setActividadSeleccionada] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("");

  // Memorizar marcas y actividades únicas
  const marcas = useMemo(
    () => [...new Set(productos.map((p) => p.nombre))],
    [productos]
  );
  const actividades = useMemo(
    () => [...new Set(productos.map((p) => p.actividad))],
    [productos]
  );

  // Filtrado reactivo
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

    // Aquí el padre puede resetear la página a 1
    onFiltrar(filtrados);
  }, [
    marcaSeleccionada,
    actividadSeleccionada,
    ordenPrecio,
    productos
  
  ]);

  const resetFiltros = () => {
    setMarcaSeleccionada("");
    setActividadSeleccionada("");
    setOrdenPrecio("");
    onFiltrar(productos); // el padre se encarga de resetear la página
  };

  return (
    <section className="formulario buscador">
      <h2>{t("search.title")}</h2>
      <h3>{t("search.subtitle")}</h3>

      <div className="input-buscador">
        <button className="boton-verde boton-redondeado" onClick={resetFiltros}>
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
                {act}
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
