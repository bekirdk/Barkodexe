import React from 'react';
import {
    Typography,
    Box,
    Paper,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette'; // Tema için ikon

const Hesabim = () => {
    // Şimdilik sahte kullanıcı bilgileri
    const user = {
        name: 'Bekir DK',
        email: 'bekir@example.com',
        avatar: 'B' // Avatar için baş harf
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Hesabım
            </Typography>

            <Paper sx={{ padding: '2rem', maxWidth: '600px', margin: '1rem auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <Avatar sx={{ width: 64, height: 64, marginRight: '1rem', bgcolor: 'secondary.main' }}>
                        {user.avatar}
                    </Avatar>
                    <Box>
                        <Typography variant="h5">{user.name}</Typography>
                        <Typography color="text.secondary">{user.email}</Typography>
                    </Box>
                </Box>

                <Divider />

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Genel Ayarlar" secondary="Uygulama bildirimleri ve tercihler" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PaletteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Görünüm" secondary="Tema ve renk ayarları" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="İletişim Tercihleri" secondary="E-posta ve bülten ayarları" />
                    </ListItem>
                </List>

                 {/* İleride buraya 'Şifre Değiştir', 'Çıkış Yap' gibi butonlar eklenebilir */}
            </Paper>
        </Box>
    );
};

export default Hesabim;