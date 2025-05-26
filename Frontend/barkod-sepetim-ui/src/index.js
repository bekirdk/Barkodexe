import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Temel CSS (içi boş olabilir veya temel sıfırlamalar içerebilir)
import App from './App';
import { CssBaseline } from '@mui/material'; // MUI için temel CSS sıfırlaması
import { BrowserRouter } from 'react-router-dom'; // Sayfa yönlendirmesi için
import { CartProvider } from './context/CartContext'; // Sepet Context'i için
import { AuthProvider } from './context/AuthContext'; // Kimlik Doğrulama Context'i için

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Uygulama genelinde sayfa yönlendirme yetenekleri için */}
    <BrowserRouter>
      {/* Uygulama genelinde kimlik doğrulama durumunu yönetmek için */}
      <AuthProvider>
        {/* Uygulama genelinde sepet verilerini yönetmek için */}
        <CartProvider>
          {/* Material UI için tarayıcılar arası tutarlı bir temel stil sağlar */}
          <CssBaseline />
          {/* Ana Uygulama Bileşenimiz */}
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);