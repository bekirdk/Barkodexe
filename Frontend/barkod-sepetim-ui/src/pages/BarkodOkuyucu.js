import React, { useState, useCallback } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Stack,
    Alert,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    CircularProgress,
    Avatar // Avatar'ı import ediyoruz
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5194/api';
const açıkGriRenk = 'grey.100'; // MUI tema renklerinden veya direkt HEX kodu (#f5f5f5 gibi)

const BarkodOkuyucu = () => {
    const [barcode, setBarcode] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { cartItems, addToCart, getCartTotal, removeFromCart } = useCart();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setBarcode(event.target.value);
        setMessage(null);
        setError(false);
    };

    const handleAddToCart = useCallback(async () => {
        if (!barcode.trim()) {
            setMessage("Lütfen bir barkod girin.");
            setError(true);
            return;
        }
        setIsLoading(true);
        setMessage(null);
        setError(false);
        try {
            const response = await axios.get(`${API_URL}/urunler/${barcode.trim()}`);
            const product = response.data;
            if (product) {
                addToCart(product);
                setMessage(`${product.urunAdi} başarıyla sepete eklendi!`);
                setError(false);
                setBarcode('');
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setMessage("Bu barkoda sahip bir ürün bulunamadı.");
            } else {
                setMessage("Ürün aranırken bir hata oluştu: " + (err.response?.data?.message || err.message));
                console.error("Barkodla ürün arama hatası:", err);
            }
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }, [barcode, addToCart]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddToCart();
        }
    }, [handleAddToCart]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                Barkod Okuyucu
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                Ürün barkodunu okutarak veya manuel girerek hızlıca sepete ekleyin.
            </Typography>

            {/* İçerik Alanını Saran ve Ortalanan Box */}
            <Box
                sx={{
                    maxWidth: '700px', // Maksimum genişlik (isteğe bağlı)
                    margin: '0 auto',  // Ortalamak için
                }}
            >
                {/* Barkod Giriş Alanı */}
                <Paper
                    variant="outlined" // Gölgeli yerine çizgili kenarlık veya elevation={0}
                    sx={{
                        padding: '2rem',
                        marginBottom: '2rem', // Sepet özeti ile arasına boşluk
                        backgroundColor: açıkGriRenk, // <<<=== AÇIK GRİ ARKA PLAN
                        borderRadius: '12px'
                    }}
                >
                    <Stack spacing={2.5} alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb:1 }}>
                            <QrCodeScannerIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Barkodu Okutun veya Girin
                        </Typography>
                        {message && (
                            <Alert severity={error ? "error" : "success"} sx={{ width: '100%', mt: 1 }}>
                                {message}
                            </Alert>
                        )}
                        <TextField
                            fullWidth
                            label="Barkod Numarası"
                            variant="outlined"
                            value={barcode}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            disabled={isLoading}
                            sx={{ marginY: '1rem', backgroundColor: 'white', borderRadius: '8px' }} // Input içi beyaz olabilir
                            InputProps={{ sx: { borderRadius: '8px' } }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AddShoppingCartIcon />}
                            onClick={handleAddToCart}
                            disabled={!barcode.trim() || isLoading}
                            sx = {{
                                py: 1.5,
                                px: 4,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: '600'
                            }}
                        >
                            {isLoading ? "Aranıyor..." : "Sepete Ekle"}
                        </Button>
                    </Stack>
                </Paper>

                {/* Sepet Özeti Alanı */}
                <Paper
                    variant="outlined" // Gölgeli yerine çizgili kenarlık veya elevation={0}
                    sx={{
                        padding: '1.5rem',
                        backgroundColor: açıkGriRenk, // <<<=== AÇIK GRİ ARKA PLAN
                        borderRadius: '12px'
                    }}
                >
                    <Stack spacing={1.5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <ShoppingCartIcon color="primary" />
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>Sepet Özeti</Typography>
                        </Box>
                        <Divider />

                        {cartItems.length === 0 ? (
                            <Typography sx={{ padding: '1rem', textAlign: 'center', color: 'text.secondary' }}>
                                Sepetiniz henüz boş.
                            </Typography>
                        ) : (
                            <List dense sx={{ maxHeight: '250px', overflow: 'auto', my: 1 }}>
                                {cartItems.map(item => (
                                    <ListItem
                                        key={item.urunID}
                                        disablePadding
                                        sx={{ py: 0.5 }}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" size="small" onClick={() => removeFromCart(item.urunID)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={`${item.urunAdi} (x${item.quantity})`}
                                            secondary={`${(item.fiyat * item.quantity).toFixed(2)} TL`}
                                            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                            secondaryTypographyProps={{ fontSize: '0.8rem' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        <Divider />
                        <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold', mt: 1 }}>
                            Toplam: {getCartTotal().toFixed(2)} TL
                        </Typography>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => navigate('/cart')}
                            disabled={cartItems.length === 0}
                            sx = {{
                                py: 1.2,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: '600'
                            }}
                        >
                            Detaylı Sepete Git
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
};

export default BarkodOkuyucu;