import React from 'react';
import {
    Drawer, Box, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Toolbar, Divider, Typography, Badge
    // Kullanılmayan 'Button' importu kaldırıldı
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;
const darkBackgroundColor = '#1E1E1E';
const lightTextColor = '#E0E0E0';
const activeBackgroundColor = '#FFFFFF';
const activeTextColor = '#1E1E1E';
const hoverBackgroundColor = '#333333';

const Sidebar = () => {
    const { cartItemCount } = useCart();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getNavLinkStyle = ({ isActive }) => ({
        textDecoration: 'none',
        display: 'block',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: isActive ? activeBackgroundColor : 'transparent',
        color: isActive ? activeTextColor : lightTextColor,
        '&:hover': {
            backgroundColor: isActive ? activeBackgroundColor : hoverBackgroundColor,
        },
    });

    const loggedInMenuItems = [
        { text: 'Ana Sayfa', icon: <HomeIcon />, path: '/' },
        { text: 'Barkod Okuyucu', icon: <QrCodeScannerIcon />, path: '/scanner' },
        { text: 'Ürünlerim', icon: <InventoryIcon />, path: '/products' },
        { text: 'Sepetim', icon: <ShoppingCartIcon />, path: '/cart', id: 'cart' },
        { text: 'Hesabım', icon: <AccountCircleIcon />, path: '/account' },
    ];

    const loggedOutMenuItems = [
        { text: 'Giriş Yap', icon: <LoginIcon />, path: '/login' },
        { text: 'Kayıt Ol', icon: <AppRegistrationIcon />, path: '/register' },
    ];

    const menuItemsToDisplay = currentUser ? loggedInMenuItems : loggedOutMenuItems;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth, boxSizing: 'border-box', backgroundColor: darkBackgroundColor,
                    borderRight: 'none', color: lightTextColor,
                },
            }}
        >
            <Toolbar sx={{ justifyContent: 'center', paddingY: '1rem !important' }}>
                <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                   <span style={{color: '#FADDAA'}}>Barkod</span>Sepetim
                </Typography>
            </Toolbar>
            <Divider sx={{ backgroundColor: '#444' }} />

            <Box sx={{ overflow: 'auto', padding: '10px', flexGrow: 1 }}>
                <List>
                    {menuItemsToDisplay.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ marginBottom: '8px' }}>
                            <NavLink to={item.path} style={getNavLinkStyle}>
                                {({ isActive }) => (
                                    <ListItemButton sx={{ borderRadius: '8px', padding: '10px 16px' }}>
                                        <ListItemIcon sx={{ color: isActive ? activeTextColor : lightTextColor, minWidth: '40px' }}>
                                            {item.id === 'cart' && currentUser ? (
                                                <Badge badgeContent={cartItemCount} color="primary">
                                                    {item.icon}
                                                </Badge>
                                            ) : (
                                                item.icon
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            sx={{
                                                color: isActive ? activeTextColor : lightTextColor,
                                                '& .MuiTypography-root': { fontWeight: isActive ? 'bold' : 'normal' }
                                            }}
                                        />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {currentUser && (
                <>
                    <Divider sx={{ backgroundColor: '#444' }} />
                    <List sx={{ padding: '10px' }}>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{ borderRadius: '8px', padding: '10px 16px', '&:hover': { backgroundColor: hoverBackgroundColor } }}
                                onClick={handleLogout}
                            >
                                <ListItemIcon sx={{ color: lightTextColor, minWidth: '40px' }}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Çıkış Yap" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}
        </Drawer>
    );
};

export default Sidebar;