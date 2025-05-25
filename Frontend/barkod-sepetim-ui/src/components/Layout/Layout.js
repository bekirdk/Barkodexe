import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* CssBaseline index.js'e taşındı */}
            <Header />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#F9F9F9', // Arka plan rengi
                    p: 3,
                    minHeight: '100vh'
                }}
            >
                <Toolbar /> {/* Header'ın altında başlaması için boşluk */}
                {children} {/* Sayfa içerikleri buraya gelecek */}
            </Box>
        </Box>
    );
};

export default Layout;