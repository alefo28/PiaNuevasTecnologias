import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import './App.css';  // Para los estilos globales
import App from './App.jsx';
import AdminPage from './pages/Admin/admin.jsx';

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