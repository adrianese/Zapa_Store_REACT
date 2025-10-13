
import "./Boton.css";

const Boton = ({
  texto,
  tipo = "button",
  estilo = "boton-verde",
  onClick,
  submit = false,
  extraClass = "",
}) => {
  return (
    <button
      type={submit ? "submit" : tipo}
      className={`${estilo} ${extraClass}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Boton;

/*
<Boton texto="Enviar" estilo="boton-verde" onClick={handleClick} />;

<Boton texto="Finalizar Compra" estilo="boton-amarillo-block" submit={true} />

<Boton texto="Suscribirme" estilo="boton-verde boton-redondeado" />

<Boton texto="Ver más" estilo="boton-verde" extraClass="mb-2" />
*/