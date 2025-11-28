import styled, { css } from "styled-components";

// 🔹 Base para inputs y textareas
const InputBase = css`
  width: 100%;
  padding: 0.2rem;
  border: 1px solid var(--input-border, #ccc);
  border-radius: 4px;
  background-color: var(--bg-body, #fff);
  color: var(--text-campo, #333); /* corregido */
  box-sizing: border-box;

  &.input-error {
    border-color: red;
    background-color: #ffe5e5; /* opcional: feedback visual */
  }
`;

// 🔹 Contenedor principal del formulario
export const FormContainer = styled.div`
  background-color: var(--form-bg, #f7f7f7);
  color: var(--text-color, #333);
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  margin: 4rem auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

// 🔹 Grupo de campos
export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
  color: var(--text-color, #333);
`;

// 🔹 Inputs y Textareas
export const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  ${InputBase}
`;

export const Textarea = styled.textarea`
  ${InputBase}
  min-height: 80px;
  resize: vertical;
`;

// 🔹 Radios
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

// 🔹 Vista previa
export const PreviewContainer = styled.div`
  margin: 0.5rem 0;
  text-align: left;
`;

export const PreviewImage = styled.img`
  max-width: 260px;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
`;

// 🔹 Acciones
export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding: 0 1rem;
`;

// 🔹 Base para botones
const ButtonBase = css`
  border: none;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
  padding: 1.5rem 3rem;
  border-radius: 1rem;
  margin: 2.5rem 0rem;
  align-self: center;
  flex: 1;
  max-width: 200px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

// 🔹 Botón verde
export const BotonVerde = styled.button`
  ${ButtonBase}
  background-color: #71b100;

  &:hover {
    background-color: #619800;
  }
`;

// 🔹 Botón amarillo (ejemplo de variante)
export const BotonNaranja = styled.button`
  ${ButtonBase}
  background-color: #c77808;

  &:hover {
    background-color: #a86106;
  }
`;

// 🔹 Acciones superiores
export const TopActions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;
