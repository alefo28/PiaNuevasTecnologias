import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import AdminPage from './Components/Admin/admin.jsx';  // Asegúrate de importar la página de admin
import './App.css';  // Para los estilos globales
import App from './App.jsx';

const RouterPage = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default RouterPage;