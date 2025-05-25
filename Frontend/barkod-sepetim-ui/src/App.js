import React from 'react';
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';

// Sayfaları import edelim
import AnaSayfa from './pages/AnaSayfa';
import BarkodOkuyucu from './pages/BarkodOkuyucu';
import Urunlerim from './pages/Urunlerim';
import Sepetim from './pages/Sepetim';
import Hesabim from './pages/Hesabim';

function App() {
  return (
    // Ana Yerleşimi (Sidebar + Header) çağırıyoruz
    <Layout>
      {/* Sayfa Yönlendirmelerini tanımlıyoruz */}
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/scanner" element={<BarkodOkuyucu />} />
        <Route path="/products" element={<Urunlerim />} />
        <Route path="/cart" element={<Sepetim />} />
        <Route path="/account" element={<Hesabim />} />
      </Routes>
    </Layout>
  );
}

export default App;