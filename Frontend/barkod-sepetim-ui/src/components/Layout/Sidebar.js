import React from 'react';
import {
    Drawer, Box, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Toolbar, Typography, Badge,
    Divider // <<<=== Divider BURAYA EKLENDİ
} from '@mui/material';
// İkonları import edelim
import DashboardIcon from '@mui/icons-material/Dashboard';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined'; // Outlined versiyon
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
// Logo için var olan bir ikon kullanalım:
import QrCode2Icon from '@mui/icons-material/QrCode2'; // Daha belirgin bir barkod/QR ikonu

import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 260;
const sidebarBackgroundColor = '#FFFFFF';
const logoTextColor = '#1F2937';
const listHeaderTextColor = '#6B7280';
const menuItemTextColor = '#374151';
const menuItemIconColor = '#6B7280';
const activeItemColor = '#4F46E5';
const activeItemBackground = 'rgba(79, 70, 229, 0.08)';
const hoverBackground = 'rgba(0, 0, 0, 0.04)';

const ListHeader = ({ text }) => (
    <Typography
        variant="overline"
        sx={{
            padding: '20px 16px 8px 16px',
            color: listHeaderTextColor,
            fontWeight: 600,
            display: 'block',
            fontSize: '0.70rem',
            letterSpacing: '0.05em'
        }}
    >
        {text}
    </Typography>
);

const SidebarNavItem = ({ item, isActive }) => {
    const iconColor = isActive ? activeItemColor : menuItemIconColor;
    const textColor = isActive ? activeItemColor : menuItemTextColor;
    const itemBackgroundColor = isActive ? activeItemBackground : 'transparent';

    return (
        <ListItemButton
            sx={{
                borderRadius: '6px',
                margin: '2px 0',
                padding: '8px 16px',
                backgroundColor: itemBackgroundColor,
                color: textColor,
                position: 'relative',
                '&:hover': {
                    backgroundColor: isActive ? activeItemBackground : hoverBackground,
                },
                '&::before': isActive ? { // Aktif link için sol tarafa dikey çizgi
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '15%',
                    bottom: '15%',
                    width: '3.5px',
                    backgroundColor: activeItemColor,
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px'
                } : {},
            }}
        >
            <ListItemIcon sx={{ color: iconColor, minWidth: '38px' }}>
                {item.id === 'cart' && item.showCartBadge ? (
                    <Badge badgeContent={item.cartItemCount} color="error"
                        sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}
                    >
                        {React.cloneElement(item.icon, { sx: { fontSize: '1.25rem' } })}
                    </Badge>
                ) : (
                    React.cloneElement(item.icon, { sx: { fontSize: '1.25rem' } })
                )}
            </ListItemIcon>
            <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.875rem',
                    color: textColor
                }}
            />
        </ListItemButton>
    );
};

const Sidebar = () => {
    const { cartItemCount } = useCart();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const mainMenuItems = [
        { text: 'Ana Panel', icon: <DashboardIcon fontSize="small"/>, path: '/' },
        { text: 'Barkod Okuyucu', icon: <QrCodeScannerOutlinedIcon fontSize="small"/>, path: '/scanner' },
        { text: 'Ürün Yönetimi', icon: <Inventory2OutlinedIcon fontSize="small"/>, path: '/products' },
        { text: 'Satış Sepeti', icon: <ShoppingCartOutlinedIcon fontSize="small"/>, path: '/cart', id: 'cart', showCartBadge: currentUser, cartItemCount },
    ];

    const userManagementItems = [
        { text: 'Hesabım', icon: <PersonOutlineOutlinedIcon fontSize="small"/>, path: '/account' },
        { text: 'Ayarlar', icon: <SettingsOutlinedIcon fontSize="small"/>, path: '/settings' },
    ];

    const guestMenuItems = [
        { text: 'Giriş Yap', icon: <LoginOutlinedIcon fontSize="small"/>, path: '/login' },
        { text: 'Kayıt Ol', icon: <AppRegistrationOutlinedIcon fontSize="small"/>, path: '/register' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: sidebarBackgroundColor,
                    borderRight: `1px solid #EAECF0`,
                    color: menuItemTextColor, // Varsayılan metin rengini menuItemTextColor yaptık
                    px: '16px',
                },
            }}
        >
            <Toolbar sx={{ justifyContent: 'flex-start', alignItems: 'center', py: '18px !important', pl: '0px !important', height: '64px', mb:1 }}>
                <QrCode2Icon sx={{ color: activeItemColor, fontSize: '2.4rem', mr: 1.5 }} /> {/* Logo olarak QrCode2Icon */}
                <Typography variant="h6" sx={{ color: logoTextColor, fontWeight: '600' }}>
                    BarkodSepetim
                </Typography>
            </Toolbar>

            <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1, pt: 0 }}>
                {currentUser ? (
                    <>
                        <ListHeader text="Ana Menü" />
                        <List dense sx={{ p: 0 }}>
                            {mainMenuItems.map((item) => (
                                <NavLink key={item.text} to={item.path} style={{ textDecoration: 'none' }}>
                                    {({ isActive }) => (
                                        <ListItem disablePadding>
                                            <SidebarNavItem item={item} isActive={isActive} />
                                        </ListItem>
                                    )}
                                </NavLink>
                            ))}
                        </List>

                        <ListHeader text="Yönetim" />
                        <List dense sx={{ p: 0 }}>
                            {userManagementItems.map((item) => (
                                <NavLink key={item.text} to={item.path} style={{ textDecoration: 'none' }}>
                                     {({ isActive }) => (
                                        <ListItem disablePadding>
                                            <SidebarNavItem item={item} isActive={isActive} />
                                        </ListItem>
                                    )}
                                </NavLink>
                            ))}
                        </List>
                    </>
                ) : (
                    <List dense sx={{ p: 0 }}>
                        {guestMenuItems.map((item) => (
                             <NavLink key={item.text} to={item.path} style={{ textDecoration: 'none' }}>
                                 {({ isActive }) => (
                                    <ListItem disablePadding>
                                        <SidebarNavItem item={item} isActive={isActive} />
                                    </ListItem>
                                )}
                            </NavLink>
                        ))}
                    </List>
                )}
            </Box>

            {currentUser && (
                <Box sx={{ py: 2 }}>
                    <Divider sx={{ backgroundColor: '#EAECF0', mx: 0, mb: 1 }} />
                     <NavLink to="#" onClick={handleLogout} style={{ textDecoration: 'none' }}>
                        {() => ( // isActive burada gereksiz olduğu için kaldırdık
                            <ListItem disablePadding>
                                 <SidebarNavItem item={{text: 'Çıkış Yap', icon: <LogoutOutlinedIcon fontSize="small"/>}} isActive={false} />
                            </ListItem>
                        )}
                    </NavLink>
                </Box>
            )}
        </Drawer>
    );
};

export default Sidebar;