import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./CarouselExclusivos.css";

const CarouselExclusivos = () => {
  const { t } = useTranslation();

  const slides = [
    {
      img: "img/NI-9812.jpg",
      alt: t("carousel.slide1.alt"),
      titulo: t("carousel.slide1.title"),
      descripcion: t("carousel.slide1.description"),
      boton: { texto: t("carousel.slide1.button"), color: "#00CFFF" },
    },
    {
      img: "img/AD-1689.jpg",
      alt: t("carousel.slide2.alt"),
      titulo: t("carousel.slide2.title"),
      descripcion: t("carousel.slide2.description"),
      boton: { texto: t("carousel.slide2.button"), color: "#FF5733" },
    },
    {
      img: "img/UN-0512.jpg",
      alt: t("carousel.slide3.alt"),
      titulo: t("carousel.slide3.title"),
      descripcion: t("carousel.slide3.description"),
      boton: {
        texto: t("carousel.slide3.button"),
        color: "#7FFF00",
        textoColor: "#000000",
      },
    },
    {
      img: "img/NI-0983.jpg",
      alt: t("carousel.slide4.alt"),
      titulo: t("carousel.slide4.title"),
      descripcion: t("carousel.slide4.description"),
      boton: { texto: t("carousel.slide4.button"), color: "#00CFFF" },
    },
    {
      img: "img/AD-2241.jpg",
      alt: t("carousel.slide5.alt"),
      titulo: t("carousel.slide5.title"),
      descripcion: t("carousel.slide5.description"),
      boton: { texto: t("carousel.slide5.button"), color: "#FF5733" },
    },
    {
      img: "img/UN-7594.jpg",
      alt: t("carousel.slide6.alt"),
      titulo: t("carousel.slide6.title"),
      descripcion: t("carousel.slide6.description"),
      boton: {
        texto: t("carousel.slide6.button"),
        color: "#7FFF00",
        textoColor: "#000000",
      },
    },
  ];

  return (
    <section className="container exclusivos">
      <h2 className="text-center my-5">{t("carousel.sectionTitle")}</h2>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <Carousel variant="dark">
            {slides.map((slide, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-75" src={slide.img} alt={slide.alt} />
                <Carousel.Caption className="carousel-caption-custom">
                  <h5>{slide.titulo}</h5>
                  <p>{slide.descripcion}</p>
                  <Link
                    to="/productos"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: slide.boton.color,
                      borderColor: slide.boton.color,
                      color: slide.boton.textoColor || "#fff",
                    }}
                  >
                    {slide.boton.texto}
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CarouselExclusivos;
