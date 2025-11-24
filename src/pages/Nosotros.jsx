import React from "react";
import { useTranslation } from "react-i18next";

function Nosotros() {
  const { t } = useTranslation();

  return (
    <main className="div-base">
      <h2>{t("about.title")}</h2>
    </main>
  );
}

export default Nosotros;
