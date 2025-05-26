import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Typography } from '@mui/material'; // Typography buraya taşındı

// Context
import { useAuth } from '../context/AuthContext';

// Sayfaları import edelim
import AnaSayfa from '../pages/AnaSayfa';
import BarkodOkuyucu from '../pages/BarkodOkuyucu';
import Urunlerim from '../pages/Urunlerim';
import Sepetim from '../pages/Sepetim';
import Hesabim from '../pages/Hesabim';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

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

const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoadingAuth } = useAuth();

    if (isLoadingAuth) {
        return <Typography>Yükleniyor...</Typography>;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const AnimatedRoutes = () => {
    const location = useLocation();
    const { isLoadingAuth } = useAuth(); // Sadece isLoadingAuth'u alıyoruz

    if (isLoadingAuth) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>Kimlik durumu kontrol ediliyor...</Typography></Box>;
    }

    return (
        <Box sx={{ position: 'relative', width: '100%', minHeight: 'calc(100vh - 64px - 48px)' }}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {/* Herkesin Erişebileceği Rotalar */}
                    <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
                    <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />

                    {/* Sadece Giriş Yapmış Kullanıcıların Erişebileceği Rotalar */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <PageWrapper><AnaSayfa /></PageWrapper>
                        </ProtectedRoute>
                    } />
                    <Route path="/scanner" element={
                        <ProtectedRoute>
                            <PageWrapper><BarkodOkuyucu /></PageWrapper>
                        </ProtectedRoute>
                    } />
                    <Route path="/products" element={
                        <ProtectedRoute>
                            <PageWrapper><Urunlerim /></PageWrapper>
                        </ProtectedRoute>
                    } />
                    <Route path="/cart" element={
                        <ProtectedRoute>
                            <PageWrapper><Sepetim /></PageWrapper>
                        </ProtectedRoute>
                    } />
                     <Route path="/account" element={
                        <ProtectedRoute>
                            <PageWrapper><Hesabim /></PageWrapper>
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<PageWrapper><Typography variant="h3">404 - Sayfa Bulunamadı</Typography></PageWrapper>} />
                </Routes>
            </AnimatePresence>
        </Box>
    );
};

export default AnimatedRoutes;