import Formulario from "../components/Formulario";


function Contacto() {
  return (
    <main className="contenedor seccion">
      <Formulario
        titulo="Llene el Formulario de Contacto"
        action="https://formspree.io/f/xrbkooqa"
        campos={[
          {
            label: "Nombre",
            name: "nombre",
            type: "text",
            placeholder: "Tu Nombre",
            required: true,
          },
          {
            label: "E-mail",
            name: "email",
            type: "email",
            placeholder: "Tu Email",
            required: true,
          },
          {
            label: "Teléfono",
            name: "telefono",
            type: "tel",
            placeholder: "Tu Teléfono",
            required: false,
          },
        ]}
        mensaje=""
        botonTexto="Enviar"
        incluirSuscripcion={true}
      />
      ;{/* contenido del formulario */}
    </main>
  );
}


export default Contacto;