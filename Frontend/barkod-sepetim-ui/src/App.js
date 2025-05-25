import React from 'react';
import Layout from './components/Layout/Layout';
import AnimatedRoutes from './components/AnimatedRoutes'; // AnimatedRoutes'u import ediyoruz

function App() {
  return (
    // Ana yerleşim (Layout) bileşenimiz
    <Layout>
      {/* Rotaları ve animasyonları yönetecek olan bileşenimiz */}
      <AnimatedRoutes />
    </Layout>
  );
}

export default App;