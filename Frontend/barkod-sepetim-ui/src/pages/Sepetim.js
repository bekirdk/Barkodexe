import React, { useState } from 'react'; // useState eklendi
import {
    Typography,
    Box,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Divider,
    Button,
    Stack,
    Alert // Alert eklendi
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // useNavigate eklendi

const Sepetim = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart(); // clearCart eklendi
    const navigate = useNavigate(); // Yönlendirme için
    const [checkoutMessage, setCheckoutMessage] = useState(''); // Sipariş mesajı için state

    const handleCheckout = () => {
        // Gerçek bir uygulamada burada ödeme API'sine istek atılır
        console.log("Ödeme işlemi başlatıldı (simülasyon)...");
        console.log("Sepet İçeriği:", cartItems);
        console.log("Toplam Tutar:", getCartTotal());

        // Siparişi (sahte olarak) oluşturuldu kabul edelim
        setCheckoutMessage("Siparişiniz başarıyla alındı! Ana sayfaya yönlendiriliyorsunuz...");
        clearCart(); // Sepeti temizle

        // Birkaç saniye sonra ana sayfaya yönlendir
        setTimeout(() => {
            navigate('/');
            setCheckoutMessage(''); // Mesajı temizle (isteğe bağlı)
        }, 3000); // 3 saniye sonra
    };

    if (checkoutMessage) { // Önce checkout mesajını gösterelim
        return (
            <Box sx={{ textAlign: 'center', marginTop: '5rem', padding: '2rem' }}>
                <Alert severity="success" sx={{ mb: 2, fontSize: '1.2rem' }}>{checkoutMessage}</Alert>
                <Typography color="text.secondary">
                    İlginiz için teşekkür ederiz!
                </Typography>
            </Box>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', marginTop: '5rem' }}>
                <ProductionQuantityLimitsIcon sx={{ fontSize: 80, color: 'grey.400' }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Sepetiniz Boş
                </Typography>
                <Typography color="text.secondary">
                    Barkod okuyucu ile ürün eklemeye başlayın!
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                Alışveriş Sepetim
            </Typography>
             <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                Sepetinizdeki ürünleri kontrol edin ve ödeme işlemine geçin.
            </Typography>

            <Paper variant="outlined" sx={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'grey.100' }}>
                <List>
                    {cartItems.map((item) => (
                        <React.Fragment key={item.urunID}>
                            <ListItem
                                sx={{py: 1.5}}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => removeFromCart(item.urunID)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>
                                        {(item.urunAdi && typeof item.urunAdi === 'string') ? item.urunAdi.charAt(0).toUpperCase() : '?'}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.urunAdi || "İsimsiz Ürün"}
                                    secondary={`Fiyat: ${(item.fiyat || 0).toFixed(2)} TL`}
                                    primaryTypographyProps={{ fontWeight: 500, mb: 0.5 }}
                                />
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ marginRight: { xs: '2rem', sm: '4rem' } }}>
                                     <IconButton
                                         size="small"
                                         onClick={() => updateQuantity(item.urunID, -1)}
                                         disabled={item.quantity <= 1}
                                         color="primary"
                                     >
                                         <RemoveCircleOutlineIcon />
                                     </IconButton>
                                     <Typography variant="body1" sx={{ minWidth: '24px', textAlign: 'center', fontWeight: 500 }}>
                                         {item.quantity}
                                     </Typography>
                                     <IconButton
                                         size="small"
                                         onClick={() => updateQuantity(item.urunID, 1)}
                                         color="primary"
                                     >
                                         <AddCircleOutlineIcon />
                                     </IconButton>
                                     <Typography variant="body1" sx={{fontWeight: 'bold', minWidth: '80px', textAlign: 'right', color: 'text.primary'}}>
                                         {((item.fiyat || 0) * item.quantity).toFixed(2)} TL
                                     </Typography>
                                </Stack>
                            </ListItem>
                            { cartItems.indexOf(item) < cartItems.length - 1 && <Divider variant="inset" component="li" /> }
                        </React.Fragment>
                    ))}
                </List>
                <Divider sx={{ my: 2 }}/>
                <Box sx={{ padding: '1rem 0 0 0', textAlign: 'right' }}>
                    <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
                        Toplam Tutar: {getCartTotal().toFixed(2)} TL
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCartCheckoutIcon />}
                        sx = {{
                            py: 1.5,
                            px: 4,
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: '600',
                            mt: 1
                        }}
                        onClick={handleCheckout} // <<<=== onClick olayı eklendi
                    >
                        Ödemeye Geç
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Sepetim;