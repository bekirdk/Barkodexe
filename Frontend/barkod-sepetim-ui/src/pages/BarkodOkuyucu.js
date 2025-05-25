import React, { useState } from 'react';
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
    IconButton
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { findProductByBarcode } from '../data/products';
import { useNavigate } from 'react-router-dom';

const BarkodOkuyucu = () => {
    const [barcode, setBarcode] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const { cartItems, addToCart, getCartTotal, removeFromCart } = useCart();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setBarcode(event.target.value);
        setMessage(null);
    };

    const handleAddToCart = () => {
        if (!barcode.trim()) {
            setMessage("Lütfen bir barkod girin.");
            setError(true);
            return;
        }

        const product = findProductByBarcode(barcode.trim());

        if (product) {
            addToCart(product);
            setMessage(`${product.productName} başarıyla sepete eklendi!`);
            setError(false);
            setBarcode('');
        } else {
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
        <Box> {/* Ana Sayfa Box'ı */}
            <Typography variant="h4" gutterBottom>
                Barkod Okuyucu & Sepet
            </Typography>

            {/* İçerik Alanını Saran ve Ortalanan Box */}
            <Box
                sx={{
                    maxWidth: '700px', // Maksimum genişliği 700px yapalım (değiştirebilirsiniz)
                    margin: '0 auto',  // Otomatik margin ile ortalayalım
                }}
            >
                {/* Barkod Giriş Alanı */}
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
                            sx={{ marginY: '1rem' }}
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

                {/* Sepet Özeti Alanı */}
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
                                        key={item.id}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" size="small" onClick={() => removeFromCart(item.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={`${item.productName} (x${item.quantity})`}
                                            secondary={`${(item.price * item.quantity).toFixed(2)} TL`}
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