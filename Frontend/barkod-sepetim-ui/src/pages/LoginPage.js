import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    CircularProgress,
    Alert,
    Divider,
    Container // Formu ortalamak için Container
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Google ikonu

// Örnek tasarımdaki renkler (Yaklaşık değerler, tam HEX kodlarını bilmemiz gerekebilir)
const primaryTextColor = '#000000'; // Siyah gibi
const secondaryTextColor = '#6b7280'; // Gri tonu
const primaryButtonColor = '#4F46E5'; // Mor/Mavi arası bir ton
const primaryButtonHoverColor = '#4338CA'; // Buton hover rengi
const borderColor = '#D1D5DB'; // Input border rengi
const googleButtonBorderColor = '#E5E7EB';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        const success = login({ username: email, email: email }); // Sahte login
        if (success) {
            navigate('/');
        } else {
            setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        }
        setLoading(false);
    };

    return (
        <Container
            component="main"
            maxWidth="xs" // Formun genişliğini sınırlar, örnekteki gibi dar bir alan için
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh', // Tüm ekran yüksekliğini kapla
                py: { xs: 4, md: 8 } // Üst ve alt iç boşluk
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    p: {xs: 2, sm: 3}, // İç padding
                    border: `1px solid ${borderColor}`, // Örnekteki gibi border
                    borderRadius: '8px', // Kenar yuvarlaklığı
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' // Hafif bir gölge
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 1, fontWeight: '600', color: primaryTextColor }}>
                    Giriş Yapın
                </Typography>
                <Typography color={secondaryTextColor} sx={{ mb: 3, fontSize: '0.9rem' }}>
                    BarkodSepetim hesabınıza erişin.
                </Typography>

                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    sx={{
                        mb: 2,
                        textTransform: 'none',
                        color: primaryTextColor,
                        borderColor: googleButtonBorderColor,
                        py: 1.2,
                        fontWeight: '500',
                        '&:hover': {
                            borderColor: 'text.primary',
                            backgroundColor: 'action.hover'
                        }
                    }}
                    onClick={() => console.log("Google ile giriş (henüz aktif değil)")}
                >
                    Google ile Giriş Yap
                </Button>

                <Divider sx={{ width: '100%', my: 2, fontSize: '0.8rem', color: secondaryTextColor }}>VEYA</Divider>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: '500', color: primaryTextColor, mb: 0.5 }}>E-posta Adresiniz</Typography>
                    <TextField
                        margin="none"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        sx={{ 
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: borderColor },
                                '&:hover fieldset': { borderColor: primaryButtonColor },
                            }
                        }}
                        placeholder="ornek@eposta.com"
                    />
                    <Typography variant="body2" sx={{ fontWeight: '500', color: primaryTextColor, mb: 0.5 }}>Şifreniz</Typography>
                    <TextField
                        margin="none"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: borderColor },
                                '&:hover fieldset': { borderColor: primaryButtonColor },
                            }
                        }}
                        placeholder="Şifrenizi girin"
                    />
                    <Grid container justifyContent="flex-end" sx={{ mt: 1, mb: 2 }}>
                         <Grid item>
                            <Link href="#" variant="body2" sx={{textDecoration: 'none', color: primaryButtonColor, fontSize: '0.85rem'}}>
                                Şifremi Unuttum?
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            py: 1.2,
                            mb: 2,
                            backgroundColor: primaryButtonColor,
                            textTransform: 'none',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: primaryButtonHoverColor
                            }
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
                    </Button>
                    <Typography variant="body2" align="center" color={secondaryTextColor}>
                        Hesabınız yok mu?{' '}
                        <Link component={RouterLink} to="/register" variant="body2" sx={{textDecoration: 'none', color: primaryButtonColor, fontWeight: '500'}}>
                            Kayıt Olun
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;