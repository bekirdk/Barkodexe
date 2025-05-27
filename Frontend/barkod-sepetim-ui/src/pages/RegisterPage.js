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

// Örnek tasarımdaki renkler (LoginPage.js ile aynı)
const primaryTextColor = '#000000';
const secondaryTextColor = '#6b7280';
const primaryButtonColor = '#4F46E5';
const primaryButtonHoverColor = '#4338CA';
const borderColor = '#D1D5DB';
const googleButtonBorderColor = '#E5E7EB';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor!');
            return;
        }
        setError('');
        setLoading(true);
        // Sahte register, normalde API çağrısı olur
        const success = register({ username, email, password });
        if (success) {
            navigate('/'); // Başarılı kayıt sonrası ana sayfaya yönlendir
        } else {
            setError('Kayıt başarısız. Lütfen daha sonra tekrar deneyin.');
        }
        setLoading(false);
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                py: { xs: 4, md: 6 } // Kayıt formu biraz daha uzun olabilir diye padding ayarı
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    p: {xs: 2, sm: 3},
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.05)'
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 1, fontWeight: '600', color: primaryTextColor }}>
                    Hesap Oluşturun
                </Typography>
                <Typography color={secondaryTextColor} sx={{ mb: 3, fontSize: '0.9rem' }}>
                    BarkodSepetim'e katılın.
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
                    onClick={() => console.log("Google ile kayıt (henüz aktif değil)")}
                >
                    Google ile Kayıt Ol
                </Button>

                <Divider sx={{ width: '100%', my: 2, fontSize: '0.8rem', color: secondaryTextColor }}>VEYA</Divider>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: '500', color: primaryTextColor, mb: 0.5 }}>Kullanıcı Adınız</Typography>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        sx={{ 
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: borderColor },
                                '&:hover fieldset': { borderColor: primaryButtonColor },
                            }
                        }}
                        placeholder="Kullanıcı adınızı seçin"
                    />
                    <Typography variant="body2" sx={{ fontWeight: '500', color: primaryTextColor, mb: 0.5 }}>E-posta Adresiniz</Typography>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
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
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        sx={{ 
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: borderColor },
                                '&:hover fieldset': { borderColor: primaryButtonColor },
                            }
                        }}
                        placeholder="Güçlü bir şifre oluşturun"
                    />
                    <Typography variant="body2" sx={{ fontWeight: '500', color: primaryTextColor, mb: 0.5 }}>Şifre Tekrar</Typography>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        name="confirmPassword"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: borderColor },
                                '&:hover fieldset': { borderColor: primaryButtonColor },
                            }
                        }}
                        placeholder="Şifrenizi tekrar girin"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            py: 1.2,
                            mt: 3, // Şifre tekrar alanından sonra biraz daha boşluk
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
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Hesap Oluştur'}
                    </Button>
                    <Typography variant="body2" align="center" color={secondaryTextColor}>
                        Zaten hesabınız var mı?{' '}
                        <Link component={RouterLink} to="/login" variant="body2" sx={{textDecoration: 'none', color: primaryButtonColor, fontWeight: '500'}}>
                            Giriş Yapın
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;