import { useTranslation } from "react-i18next";
import Formulario from "../components/Formulario";
import estanteImg from "/img/estante3903371.jpg";

function Contacto() {
  const { t } = useTranslation();

  return (
    <main className="contenedor seccion">
      <picture>
        <source srcSet={estanteImg} type="image/jpeg" />
        <img
          src={estanteImg}
          alt={t("contact.imageAlt")}
          className="contacto-img"
          loading="lazy"
        />
      </picture>

      <Formulario
        titulo={t("contact.formTitle")}
        action="https://formspree.io/f/xrbkooqa"
        campos={[
          {
            label: t("contact.fields.name.label"),
            name: "nombre",
            type: "text",
            placeholder: t("contact.fields.name.placeholder"),
            required: true,
          },
          {
            label: t("contact.fields.email.label"),
            name: "email",
            type: "email",
            placeholder: t("contact.fields.email.placeholder"),
            required: true,
          },
          {
            label: t("contact.fields.phone.label"),
            name: "telefono",
            type: "tel",
            placeholder: t("contact.fields.phone.placeholder"),
            required: false,
          },
        ]}
        mensaje=""
        botonTexto={t("contact.submit")}
        incluirSuscripcion={true}
      />
    </main>
  );
}

export default Contacto;
