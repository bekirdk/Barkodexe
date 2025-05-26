import React, { useState, useCallback } from 'react'; // useCallback eklendi
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
    CircularProgress // Yükleme göstergesi için
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
// import { findProductByBarcode } from '../data/products'; // Artık buna ihtiyacımız yok
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios'u import ediyoruz

const API_URL = 'http://localhost:5194/api'; // Backend API adresimiz

const BarkodOkuyucu = () => {
    const [barcode, setBarcode] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Yükleme durumu için
    const { cartItems, addToCart, getCartTotal, removeFromCart } = useCart();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setBarcode(event.target.value);
        setMessage(null); // Yazmaya başlayınca mesajı temizle
        setError(false);
    };

    // handleAddToCart fonksiyonunu useCallback ile sarmalıyoruz
    // çünkü handleKeyDown içinde kullanılıyor ve gereksiz yere yeniden oluşmasını engelliyoruz.
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
            // Backend API'mizden barkoda göre ürünü arıyoruz
            const response = await axios.get(`${API_URL}/urunler/${barcode.trim()}`);
            const product = response.data; // API'den gelen ürün bilgisi

            if (product) {
                addToCart(product); // Ürünü Context API ile sepete ekle
                setMessage(`${product.productName} başarıyla sepete eklendi!`);
                setError(false);
                setBarcode(''); // Input'u temizle
            }
            // Backend zaten bulunamayınca 404 döneceği için else bloğuna gerek kalmayabilir
            // ancak yine de bir güvenlik önlemi olarak bırakılabilir veya try-catch ile yönetilebilir.
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
    }, [barcode, addToCart]); // Bağımlılıkları ekledik

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddToCart();
        }
    }, [handleAddToCart]); // handleAddToCart bağımlılığını ekledik

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Barkod Okuyucu & Sepet
            </Typography>

            <Box
                sx={{
                    maxWidth: '700px',
                    margin: '0 auto',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: '2rem',
                        marginBottom: '2rem'
                    }}
                >
                    <Stack spacing={2} alignItems="center">
                        <QrCodeScannerIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                        <Typography variant="h6">
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
                            disabled={isLoading} // Yükleme sırasında pasif yap
                            sx={{ marginY: '1rem' }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AddShoppingCartIcon />}
                            onClick={handleAddToCart}
                            disabled={!barcode.trim() || isLoading} // Barkod boşsa veya yükleniyorsa pasif yap
                        >
                            {isLoading ? "Aranıyor..." : "Sepete Ekle"}
                        </Button>
                    </Stack>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        padding: '1rem',
                    }}
                >
                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShoppingCartIcon color="primary" />
                            <Typography variant="h6">Sepet Özeti</Typography>
                        </Box>
                        <Divider />

                        {cartItems.length === 0 ? (
                            <Typography sx={{ padding: '1rem', textAlign: 'center' }} color="text.secondary">
                                Sepetiniz henüz boş.
                            </Typography>
                        ) : (
                            <List dense sx={{ maxHeight: '300px', overflow: 'auto' }}>
                                {cartItems.map(item => (
                                    <ListItem
                                        key={item.urunID} // API'den gelen urunID'yi kullanalım
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" size="small" onClick={() => removeFromCart(item.urunID)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={`${item.urunAdi} (x${item.quantity})`} // API'den gelen urunAdi
                                            secondary={`${(item.fiyat * item.quantity).toFixed(2)} TL`} // API'den gelen fiyat
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        <Divider />
                        <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                            Toplam: {getCartTotal().toFixed(2)} TL
                        </Typography>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => navigate('/cart')}
                            disabled={cartItems.length === 0}
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