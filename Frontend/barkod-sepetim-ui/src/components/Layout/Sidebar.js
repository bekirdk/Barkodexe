import React from 'react';
import {
    Drawer, Box, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Toolbar, Divider, Typography
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom'; // Burayı ekleyin

const drawerWidth = 240;

const menuItems = [
    { text: 'Ana Sayfa', icon: <HomeIcon />, path: '/' },
    { text: 'Barkod Okuyucu', icon: <QrCodeScannerIcon />, path: '/scanner' },
    { text: 'Ürünlerim', icon: <InventoryIcon />, path: '/products' },
    { text: 'Sepetim', icon: <ShoppingCartIcon />, path: '/cart' },
    { text: 'Hesabım', icon: <AccountCircleIcon />, path: '/account' },
];

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#FFFBF0', borderRight: 'none' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto', padding: '10px 0' }}>
                 <Typography variant="h6" sx={{textAlign: 'center', marginBottom: '10px', color: '#333', fontWeight: 'bold'}}>
                    BarkodSepetim
                 </Typography>
                 <Divider sx={{ margin: '0 15px 10px 15px'}} />
                <List sx={{ padding: '0 10px'}}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ marginBottom: '5px' }}>
                            {/* NavLink ile sarmalıyoruz */}
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({ // style prop'u ile aktif linki belirginleştireceğiz
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    display: 'block',
                                    width: '100%',
                                    backgroundColor: isActive ? '#FADDAA' : 'transparent',
                                    borderRadius: '8px',
                                })}
                            >
                                <ListItemButton sx={{
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: '#FDEFCF',
                                    },
                                }}>
                                    <ListItemIcon sx={{color: '#555', minWidth: '40px'}}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{color: '#333'}} />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;