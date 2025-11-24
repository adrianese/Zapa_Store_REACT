import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = ({ children }) => {
  useEffect(() => {
    // Eliminar clase del body
    document.body.classList.remove("dark-mode");

    // Limpiar localStorage si lo usás
    localStorage.removeItem("darkMode");
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
