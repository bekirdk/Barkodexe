import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 240;

const Header = () => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                backgroundColor: '#F9F9F9', // Arka plana uyumlu renk
                boxShadow: 'none', // Gölgeyi kaldırdık, daha temiz
                color: '#333',
                borderBottom: '1px solid #eee' // İnce bir çizgi
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Barkod Okuyucu {/* Bu başlık dinamik olacak */}
                </Typography>
                <IconButton color="inherit">
                    <SettingsIcon />
                </IconButton>
                <IconButton color="inherit">
                    <NotificationsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;