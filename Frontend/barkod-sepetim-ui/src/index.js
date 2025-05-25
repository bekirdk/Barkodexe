import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Burayı ekleyin

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* Burayı ekleyin */}
        <CssBaseline />
        <App />
      </CartProvider> {/* Burayı ekleyin */}
    </BrowserRouter>
  </React.StrictMode>
);