import React from 'react';
import {
    Drawer, Box, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Toolbar, Divider, Typography, Badge // Badge'i import et
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout'; // Çıkış ikonu
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Sepet Context'ini import et

const drawerWidth = 240;
const darkBackgroundColor = '#1E1E1E'; // Koyu arka plan rengi
const lightTextColor = '#E0E0E0'; // Açık metin/ikon rengi
const activeBackgroundColor = '#FFFFFF'; // Aktif link arka planı
const activeTextColor = '#1E1E1E'; // Aktif link metin rengi
const hoverBackgroundColor = '#333333'; // Hover rengi

const menuItems = [
    { text: 'Ana Sayfa', icon: <HomeIcon />, path: '/' },
    { text: 'Barkod Okuyucu', icon: <QrCodeScannerIcon />, path: '/scanner' },
    { text: 'Ürünlerim', icon: <InventoryIcon />, path: '/products' },
    { text: 'Sepetim', icon: <ShoppingCartIcon />, path: '/cart', id: 'cart' }, // Sepete id ekledik
    { text: 'Hesabım', icon: <AccountCircleIcon />, path: '/account' },
];

const Sidebar = () => {
    const { cartItemCount } = useCart(); // Sepetteki ürün sayısını al

    // NavLink için stil fonksiyonu
    const getNavLinkStyle = ({ isActive }) => ({
        textDecoration: 'none',
        display: 'block',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: isActive ? activeBackgroundColor : 'transparent',
        color: isActive ? activeTextColor : lightTextColor, // Aktif/Pasif metin rengi
        '&:hover': {
            backgroundColor: isActive ? activeBackgroundColor : hoverBackgroundColor,
        },
    });

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: darkBackgroundColor, // Koyu arka plan
                    borderRight: 'none',
                    color: lightTextColor, // Varsayılan metin rengi
                },
            }}
        >
            <Toolbar sx={{ justifyContent: 'center', paddingY: '1rem !important' }}>
                {/* Logo/Başlık Alanı */}
                <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                   <span style={{color: '#FADDAA'}}>Barkod</span>Sepetim
                </Typography>
            </Toolbar>
            <Divider sx={{ backgroundColor: '#444' }} /> {/* Ayırıcı rengi */}

            <Box sx={{ overflow: 'auto', padding: '10px', flexGrow: 1 }}> {/* flexGrow: 1 ekledik */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ marginBottom: '8px' }}>
                            <NavLink to={item.path} style={getNavLinkStyle}>
                                {({ isActive }) => ( // isActive durumunu ListItemButton'a taşımak için
                                    <ListItemButton sx={{
                                        borderRadius: '8px',
                                        padding: '10px 16px',
                                        // Hover stilini NavLink'ten buraya taşıyabilir veya orada bırakabiliriz
                                        // NavLink stili genellikle daha iyi çalışır.
                                    }}>
                                        <ListItemIcon sx={{
                                            color: isActive ? activeTextColor : lightTextColor, // İkon rengi
                                            minWidth: '40px'
                                        }}>
                                            {/* Sepet linki ise Badge ekle */}
                                            {item.id === 'cart' ? (
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
                                                color: isActive ? activeTextColor : lightTextColor, // Metin rengi
                                                '& .MuiTypography-root': {
                                                     fontWeight: isActive ? 'bold' : 'normal' // Aktifse kalın
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Çıkış Butonu Alanı */}
            <Divider sx={{ backgroundColor: '#444' }} />
            <List sx={{ padding: '10px' }}>
                <ListItem disablePadding>
                    <ListItemButton sx={{
                        borderRadius: '8px',
                        padding: '10px 16px',
                        '&:hover': {
                            backgroundColor: hoverBackgroundColor,
                        },
                    }}>
                        <ListItemIcon sx={{ color: lightTextColor, minWidth: '40px' }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Çıkış Yap" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;