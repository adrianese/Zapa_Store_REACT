import styled, { css } from "styled-components";

// Helper para estilos comunes de inputs y textareas
const InputBase = css`
  width: 100%;
  padding: 0.2rem;
  border: 1px solid var(--input-border, #ccc);
  border-radius: 4px;
  background-color: var(--bg-body, #fff);
  color: var(--text-color, #333);
  box-sizing: border-box; /* Asegura que el padding no añada ancho extra */

  &.input-error {
    border-color: red;
  }
`;

// Estilos del contenedor principal
export const FormContainer = styled.div`
  background-color: var(--form-bg, #f7f7f7);
  color: var(--text-color, #333);
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  margin: 4rem auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Estilos del grupo de formulario
export const FormGroup = styled.div`
  /* margin-bottom: 0.5rem; */
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
  color: var(--text-color, #333);
`;

// Estilos para Input
export const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  ${InputBase}
`;

// Estilos para Textarea
export const Textarea = styled.textarea`
  ${InputBase}
  min-height: 80px;
  resize: vertical;
`;

// Estilos para Radio Group
export const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;

  & > label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
  }
`;

// Estilos para la vista previa
export const PreviewContainer = styled.div`
  margin: 0.5rem 0;
  text-align: left;
`;

export const PreviewImage = styled.img`
  max-width: 260px;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
`;

// Estilos para la sección de acciones/botones
export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding: 0 1rem;
`;

// Estilos base para los botones
const ButtonBase = css`
  border: none;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
`;

// Estilos del botón verde (se aplica a todos los botones en FormActions)
export const BotonVerde = styled.button`
  ${ButtonBase}
  background-color: #71b100;
  padding: 1.5rem 3rem; /* Combina padding de .boton-verde y .redondeado */
  border-radius: 1rem; /* .redondeado */
  margin: 2.5rem 0rem; /* .redondeado */
  align-self: center;
  flex: 1; /* Para que ocupen espacio similar */
  max-width: 200px;

  &:hover {
    background-color: #619800;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  /* Sobreescribe si se necesita un botón de submit diferente (aquí uso BotonVerde para ambos) */
  &[type="submit"] {
    /* Estilos específicos si el submit necesita un color o tamaño distinto */
  }
`;
