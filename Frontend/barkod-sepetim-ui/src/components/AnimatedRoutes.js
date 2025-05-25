import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@mui/material'; // <<<=== BURAYA TAŞIDIK!

// Sayfaları import edelim
import AnaSayfa from '../pages/AnaSayfa';
import BarkodOkuyucu from '../pages/BarkodOkuyucu';
import Urunlerim from '../pages/Urunlerim';
import Sepetim from '../pages/Sepetim';
import Hesabim from '../pages/Hesabim';

// Yeni: Hızlı ve Şık Solma (Fade) Animasyonu
const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    }
};

const pageTransition = {
    type: "tween",
    ease: "easeOut",
    duration: 0.3
};


const PageWrapper = ({ children }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{ position: 'absolute', width: '100%' }}
    >
        {children}
    </motion.div>
);


const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <Box sx={{ position: 'relative', width: '100%', minHeight: '80vh' }}> {/* 80vh veya uygun bir yükseklik */}
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><AnaSayfa /></PageWrapper>} />
                    <Route path="/scanner" element={<PageWrapper><BarkodOkuyucu /></PageWrapper>} />
                    <Route path="/products" element={<PageWrapper><Urunlerim /></PageWrapper>} />
                    <Route path="/cart" element={<PageWrapper><Sepetim /></PageWrapper>} />
                    <Route path="/account" element={<PageWrapper><Hesabim /></PageWrapper>} />
                </Routes>
            </AnimatePresence>
        </Box>
    );
};

export default AnimatedRoutes;