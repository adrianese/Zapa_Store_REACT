import React from "react";
import { useTranslation } from "react-i18next";

function Error404() {
  const { t } = useTranslation();

  return (
    <div className="text-center div-base">
      <h2>{t("error.title")}</h2>
      <p>{t("error.description")}</p>
    </div>
  );
}

export default Error404;
