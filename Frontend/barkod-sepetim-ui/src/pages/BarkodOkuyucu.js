import React, { useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Stack,
    Alert // Kullanıcıya geri bildirim vermek için Alert ekleyelim
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext'; // Kendi hook'umuzu import ediyoruz
import { findProductByBarcode } from '../data/products'; // Sahte ürün bulma fonksiyonunu import ediyoruz

const BarkodOkuyucu = () => {
    const [barcode, setBarcode] = useState('');
    const [message, setMessage] = useState(null); // Başarı/Hata mesajları için state
    const [error, setError] = useState(false); // Mesajın türünü belirlemek için
    const { addToCart } = useCart(); // Context'ten addToCart fonksiyonunu alıyoruz

    const handleInputChange = (event) => {
        setBarcode(event.target.value);
        setMessage(null); // Yazmaya başlayınca mesajı temizle
    };

    const handleAddToCart = () => {
        if (!barcode.trim()) {
            setMessage("Lütfen bir barkod girin.");
            setError(true);
            return;
        }

        // Sahte ürünlerimizde barkodu arıyoruz
        const product = findProductByBarcode(barcode.trim());

        if (product) {
            // Ürün bulunduysa, context'teki addToCart ile sepete ekle
            addToCart(product);
            setMessage(`${product.productName} başarıyla sepete eklendi!`);
            setError(false);
            setBarcode(''); // Input'u temizle
        } else {
            // Ürün bulunamadıysa hata mesajı göster
            setMessage("Bu barkoda sahip bir ürün bulunamadı.");
            setError(true);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddToCart();
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Barkod Okuyucu
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    padding: '2rem',
                    maxWidth: '500px',
                    margin: '2rem auto'
                }}
            >
                <Stack spacing={2} alignItems="center">

                    <QrCodeScannerIcon sx={{ fontSize: 60, color: 'primary.main' }} />

                    <Typography variant="h6">
                        Barkodu Okutun veya Girin
                    </Typography>

                    {/* Mesaj Alanı */}
                    {message && (
                        <Alert severity={error ? "error" : "success"} sx={{ width: '100%' }}>
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
                        sx={{ marginY: '1rem' }} // Üstte ve altta boşluk
                    />

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={handleAddToCart}
                        disabled={!barcode.trim()}
                    >
                        Sepete Ekle
                    </Button>

                </Stack>
            </Paper>
        </Box>
    );
};

export default BarkodOkuyucu;