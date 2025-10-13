import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch(action, {
        method: metodo,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        if (onSuccess) onSuccess(); // vacía el carrito
        navigate("/"); // redirige al inicio
      } else {
        alert("Hubo un error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("No se pudo enviar el formulario.");
    }
  };

  return (
    <section className="formulario-seccion">
      {titulo && <h3>{titulo}</h3>}

      <form ref={formRef} onSubmit={handleSubmit} className="formulario">
        <fieldset>
          <legend>Información Personal</legend>

          {campos.map((campo) => (
            <div key={campo.name}>
              <label htmlFor={campo.name}>{campo.label}</label>
              <input
                type={campo.type}
                name={campo.name}
                id={campo.name}
                placeholder={campo.placeholder}
                required={campo.required}
              />
            </div>
          ))}

          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            name="mensaje"
            id="mensaje"
            rows="4"
            placeholder="Tu mensaje"
            defaultValue={mensaje}
            readOnly={soloLectura}
            required={!soloLectura}
          />
        </fieldset>

        {incluirSuscripcion && (
          <fieldset>
            <legend>Desea Recibir Novedades de productos</legend>
            <p>Elija Una Opción</p>
            <div className="forma-contacto">
              <label htmlFor="contacto-suscripcion">Suscribirme</label>
              <input
                type="radio"
                value="suscribir"
                name="contacto"
                id="contacto-suscripcion"
              />

              <label htmlFor="contacto-desuscripcion">Desuscribirme</label>
              <input
                type="radio"
                value="desuscribir"
                name="contacto"
                id="contacto-desuscripcion"
              />
            </div>
          </fieldset>
        )}

        <input type="submit" value={botonTexto} className="boton-verde" />
      </form>
    </section>
  );
};

export default Formulario;
