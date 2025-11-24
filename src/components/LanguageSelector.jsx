import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select" className="visually-hidden">
        Idioma
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={handleChange}
        className="language-dropdown"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
