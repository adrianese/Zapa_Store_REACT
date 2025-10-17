import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import Producto from './pages/Producto';
import Footer from './components/Footer';
import { CarritoProvider } from './context/CarritoProvider';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { AuthProvider } from "./context/AuthProvider";


function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/producto/:id" element={<Producto />} />
          </Routes>
          <Footer />
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;

