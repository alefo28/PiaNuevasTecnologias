import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouterPage from './router.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Envolvemos la aplicación en React.StrictMode
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterPage />
    </BrowserRouter>
  </React.StrictMode>
);