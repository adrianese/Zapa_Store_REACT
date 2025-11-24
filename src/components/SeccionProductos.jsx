import React from "react";
import { useTranslation } from "react-i18next";
import "./SeccionProductos.css";

const SeccionProductos = () => {
  const { t } = useTranslation();

  return (
    <section id="productos">
      <div className="container text-center py-5">
        <h2>{t("productsAll.sectionTitle")}</h2>
        <div className="row productos">
          {/* Exclusivos */}
          <div className="col-12 col-md-4 columna">
            <h2 className="titulo">{t("productsAll.exclusive.title")}</h2>
            <i className="bi bi-award"></i>
            <p className="titulo-descripcion">
              {t("productsAll.exclusive.description")}
            </p>
            <div className="badges-contenedor">
              <span className="badge rounded-pill text-bg-success">
                {t("productsAll.exclusive.badge1")}
              </span>
              <span className="badge rounded-pill text-bg-dark">
                {t("productsAll.exclusive.badge2")}
              </span>
            </div>
          </div>

          {/* Todos */}
          <div className="col-12 col-md-4 columna">
            <h2 className="titulo">{t("productsAll.all.title")}</h2>
            <i className="bi bi-align-center"></i>
            <p className="titulo-descripcion">
              {t("productsAll.all.description")}
            </p>
            <div className="badges-contenedor d-flex no-wrap">
              <span className="badge rounded-pill text-bg-success">
                {t("productsAll.all.badge1")}
              </span>
              <span className="badge rounded-pill text-bg-dark">
                {t("productsAll.all.badge2")}
              </span>
            </div>
          </div>

          {/* Discontinuos */}
          <div className="col-12 col-md-4 columna">
            <h2 className="titulo">{t("productsAll.discontinued.title")}</h2>
            <i className="bi bi-slash-circle"></i>
            <p className="parrafo">{t("productsAll.discontinued.description")}</p>
            <div className="badges-contenedor">
              <span className="badge rounded-pill text-bg-success">
                {t("productsAll.discontinued.badge1")}
              </span>
              <span className="badge rounded-pill text-bg-dark">
                {t("productsAll.discontinued.badge2")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionProductos;
