import React from "react";
import { useTranslation } from "react-i18next";
import SeccionProductos from "../components/SeccionProductos";
import CarouselExclusivos from "../components/CarouselExclusivos";

const VideoBanner = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="video">
        <div className="overlay">
          <video autoPlay muted loop poster="img/banner.png">
            <source src="video/zapastore.mp4" type="video/mp4" />
            {t("home.videoFallback")}
          </video>
        </div>
      </div>

      <SeccionProductos />
      <CarouselExclusivos />
    </>
  );
};

export default VideoBanner;
