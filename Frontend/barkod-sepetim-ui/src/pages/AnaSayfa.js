import React from 'react';
import {
    Typography,
    Box,
    Grid,
    Paper, // Kartlar için Paper veya Card kullanılabilir
    Button,
    Avatar, // İkonları sarmalamak için
    Icon // Genel ikonlar için
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// İkonları import edelim (Sidebar'da kullandıklarımızla benzer veya yenileri)
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Yönlendirme ikonu

// Kartlar için ortak stil (Sidebar'daki aktif link rengini kullanalım)
const cardHoverStyle = {
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.1)', // Daha belirgin bir hover gölgesi
    }
};

const cardBackgroundColor = '#FFFFFF'; // Kartların arka planı beyaz
const cardBorderColor = '#EAECF0'; // Hafif bir border rengi
const primaryActionColor = '#4F46E5'; // Sidebar'daki aktif link rengimiz

const AnaSayfa = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { cartItemCount, getCartTotal } = useCart();

    // Kullanıcı adını veya e-postasını alalım, yoksa genel bir karşılama
    const userName = currentUser?.displayName || currentUser?.username || currentUser?.email || 'Değerli Kullanıcımız';

    const quickAccessCards = [
        {
            title: 'Barkod Okuyucu',
            description: 'Ürünleri hızla tarayın ve sepete ekleyin.',
            icon: <QrCodeScannerOutlinedIcon />,
            iconBgColor: 'primary.light', // Veya 'rgba(79, 70, 229, 0.1)' gibi
            buttonText: 'Okutmaya Başla',
            path: '/scanner',
            buttonColor: 'primary'
        },
        {
            title: 'Ürün Yönetimi',
            description: 'Kayıtlı ürünlerinizi görüntüleyin, yeni ürünler ekleyin.',
            icon: <Inventory2OutlinedIcon />,
            iconBgColor: 'info.light',
            buttonText: 'Ürünlere Git',
            path: '/products',
            buttonColor: 'info'
        },
        {
            title: 'Alışveriş Sepeti',
            description: `${cartItemCount} ürün, Toplam: ${getCartTotal().toFixed(2)} TL`,
            icon: <ShoppingCartOutlinedIcon />,
            iconBgColor: 'success.light',
            buttonText: 'Sepeti Görüntüle',
            path: '/cart',
            buttonColor: 'success',
            disabled: cartItemCount === 0
        },
        {
            title: 'Hesap Ayarları',
            description: 'Profil bilgilerinizi ve uygulama tercihlerinizi yönetin.',
            icon: <SettingsOutlinedIcon />,
            iconBgColor: 'warning.light',
            buttonText: 'Ayarlara Git',
            path: '/account', // Veya '/settings'
            buttonColor: 'warning'
        }
    ];

    return (
        <Box sx={{ p: 0.5 }}> {/* Genel sayfa için hafif bir padding */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#111827' }}>
                    Merhaba, {userName}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    BarkodSepetim'e hoş geldiniz. Hızlı işlemler için aşağıdaki kartları kullanabilirsiniz.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {quickAccessCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={3} key={index}> {/* Daha fazla kart sığması için lg={3} */}
                        <Paper
                            elevation={0} // Gölgeler yerine border kullanalım
                            sx={{
                                ...cardHoverStyle,
                                border: `1px solid ${cardBorderColor}`,
                                borderRadius: '12px', // Daha yuvarlak kenarlar
                                p: 2.5, // İç padding
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%', // Eşit yükseklik için
                                backgroundColor: cardBackgroundColor
                            }}
                        >
                            <Box>
                                <Avatar sx={{ bgcolor: card.iconBgColor, width: 48, height: 48, mb: 2 }}>
                                    {React.cloneElement(card.icon, { sx: { color: `${card.buttonColor}.main` }})}
                                </Avatar>
                                <Typography variant="h6" component="div" sx={{ fontWeight: '600', mb: 1, color: '#111827' }}>
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ minHeight: '40px', mb:2 }}> {/* Açıklama için min yükseklik */}
                                    {card.description}
                                </Typography>
                            </Box>
                            <Button
                                size="medium"
                                variant="text" // Daha sade bir buton stili
                                color={card.buttonColor}
                                endIcon={<ArrowForwardIosIcon fontSize="small" />}
                                onClick={() => navigate(card.path)}
                                disabled={card.disabled}
                                sx={{
                                    alignSelf: 'flex-start', // Butonu sola yasla
                                    textTransform: 'none',
                                    fontWeight: '600',
                                    p:0, // Padding'i sıfırla, ikonla dengeli dursun
                                    '&:hover': {
                                        backgroundColor: 'transparent' // Hover'da arka plan olmasın
                                    }
                                }}
                            >
                                {card.buttonText}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AnaSayfa;