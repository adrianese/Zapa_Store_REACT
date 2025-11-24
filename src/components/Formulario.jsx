import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Formulario.css";

const Formulario = ({
  titulo,
  action,
  metodo = "POST",
  campos = [],
  mensaje = "",
  botonTexto = "Enviar",
  incluirSuscripcion = false,
  soloLectura = false,
  onSuccess,
}) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      const response = await fetch(action, {
        method: metodo,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setEnviado(true);
        if (onSuccess) onSuccess();
        navigate("/");
      } else {
        alert(t("form.error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t("form.errorSend"));
    }
  };

  return (
    <section className="formulario-seccion">
      {titulo && <h3>{titulo}</h3>}

      <form ref={formRef} onSubmit={handleSubmit} className="formulario">
        <fieldset>
          <legend>{t("form.personalInfo")}</legend>

          {campos.map((campo) => (
            <div key={campo.name}>
              <label htmlFor={campo.name}>{campo.label}</label>
              <input
                type={campo.type}
                name={campo.name}
                id={campo.name}
                placeholder={campo.placeholder}
                required={campo.required}
                autoComplete="on"
              />
            </div>
          ))}

          <label htmlFor="mensaje">{t("form.message")}</label>
          <textarea
            name="mensaje"
            id="mensaje"
            rows="4"
            placeholder={t("form.messagePlaceholder")}
            defaultValue={mensaje}
            readOnly={soloLectura}
            required={!soloLectura}
          />
        </fieldset>

        {incluirSuscripcion && (
          <fieldset>
            <legend>{t("form.subscriptionTitle")}</legend>
            <p>{t("form.subscriptionPrompt")}</p>
            <div className="grupo-radio">
              <label className="radio-label" htmlFor="contacto-suscripcion">
                <input
                  type="radio"
                  value="suscribir"
                  name="contacto"
                  id="contacto-suscripcion"
                />
                {t("form.subscribe")}
              </label>

              <label className="radio-label" htmlFor="contacto-desuscripcion">
                <input
                  type="radio"
                  value="desuscribir"
                  name="contacto"
                  id="contacto-desuscripcion"
                />
                {t("form.unsubscribe")}
              </label>
            </div>
          </fieldset>
        )}

        <input
          type="submit"
          value={botonTexto}
          className="boton-verde"
          disabled={enviado}
        />
      </form>
    </section>
  );
};

export default Formulario;
