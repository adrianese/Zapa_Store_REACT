import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./GuiaTallesModal.css";

const datosTalles = [
  { cm: "19.5", eur: 32, arg: 31, usa: 1 },
  { cm: "20.5", eur: 33, arg: 32, usa: 2 },
  { cm: "21.5", eur: 34, arg: 33, usa: 3 },
  { cm: "22", eur: 35, arg: 34, usa: 3.5 },
  { cm: "23", eur: 36, arg: 35, usa: 4.5 },
  { cm: "23.5", eur: 37, arg: 36, usa: 5 },
  { cm: "24.5", eur: 38, arg: 37, usa: 6 },
  { cm: "25", eur: 39, arg: 38, usa: 6.5 },
  { cm: "25.5", eur: 40, arg: 39, usa: 7 },
  { cm: "26", eur: 40.5, arg: 39.5, usa: 7.5 },
  { cm: "26.5", eur: 41, arg: 40, usa: 8 },
  { cm: "27", eur: 42, arg: 41, usa: 8.5 },
  { cm: "27.5", eur: 42.5, arg: 41.5, usa: 9 },
  { cm: "28", eur: 43, arg: 42, usa: 9.5 },
  { cm: "28.5", eur: 43.5, arg: 42.5, usa: 10 },
  { cm: "29", eur: 44, arg: 43, usa: 10.5 },
  { cm: "29.5", eur: 44.5, arg: 43.5, usa: 11 },
  { cm: "30", eur: 45, arg: 44, usa: 11.5 },
  { cm: "30.5", eur: 46, arg: 45, usa: 12 },
  { cm: "31", eur: 47, arg: 46, usa: 12.5 },
];

const GuiaTallesModal = () => {
  const [abierto, setAbierto] = useState(false);
  const { t } = useTranslation();

  // Efecto para cerrar automáticamente a los 10 segundos
  useEffect(() => {
    let timer;
    if (abierto) {
      timer = setTimeout(() => {
        setAbierto(false);
      }, 10000); // 10 segundos
    }
    return () => clearTimeout(timer);
  }, [abierto]);

  return (
    <>
      <div className="boton-talles-contenedor">
        <button className="boton-talles" onClick={() => setAbierto(true)}>
          {t("guiaTalles.button")}
        </button>
      </div>

      {abierto && (
        <div className="modal-overlay" onClick={() => setAbierto(false)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={() => setAbierto(false)}>
              ×
            </button>
            <h3 className="titulo-modal">{t("guiaTalles.title")}</h3>

            <div className="scroll-tabla">
              <table className="tabla-modal">
                <thead>
                  <tr>
                    <th>cm</th>
                    <th>EUR</th>
                    <th>ARG</th>
                    <th>USA</th>
                  </tr>
                </thead>
                <tbody>
                  {datosTalles.map((fila, i) => (
                    <tr key={i}>
                      <td>{fila.cm}</td>
                      <td>{fila.eur}</td>
                      <td>{fila.arg}</td>
                      <td>{fila.usa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuiaTallesModal;
