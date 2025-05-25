import React from 'react';
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
    Stack // Miktar butonları için Stack kullanalım
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useCart } from '../context/CartContext'; // Sepet Context'i

const Sepetim = () => {
    // Context'ten sepet bilgilerini ve fonksiyonlarını alıyoruz
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    // Sepet boşsa gösterilecek mesaj
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
            <Typography variant="h4" gutterBottom>
                Alışveriş Sepetim
            </Typography>

            <Paper elevation={3} sx={{ padding: '1rem' }}>
                <List>
                    {cartItems.map((item) => (
                        <React.Fragment key={item.id}>
                            <ListItem
                                secondaryAction={ // Sağ taraftaki silme butonu
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => removeFromCart(item.id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    {/* İleride ürün resmi de eklenebilir */}
                                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                                        {item.productName.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={item.productName}
                                    secondary={`Fiyat: ${item.price.toFixed(2)} TL`}
                                />

                                {/* Miktar Ayarlama Alanı */}
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ marginRight: '4rem' }}>
                                     <IconButton
                                         size="small"
                                         onClick={() => updateQuantity(item.id, -1)} // Miktarı 1 azalt
                                         disabled={item.quantity <= 1} // Miktar 1 ise pasif yap
                                     >
                                         <RemoveCircleOutlineIcon />
                                     </IconButton>
                                     <Typography variant="body1" sx={{ minWidth: '20px', textAlign: 'center' }}>
                                         {item.quantity}
                                     </Typography>
                                     <IconButton
                                         size="small"
                                         onClick={() => updateQuantity(item.id, 1)} // Miktarı 1 artır
                                     >
                                         <AddCircleOutlineIcon />
                                     </IconButton>
                                     <Typography variant="body1" sx={{fontWeight: 'bold', minWidth: '80px', textAlign: 'right'}}>
                                         {(item.price * item.quantity).toFixed(2)} TL
                                     </Typography>
                                </Stack>

                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>

                {/* Sepet Toplamı ve Ödeme Butonu */}
                <Box sx={{ padding: '1rem', textAlign: 'right', marginTop: '1rem' }}>
                    <Typography variant="h5" gutterBottom>
                        Toplam Tutar: {getCartTotal().toFixed(2)} TL
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCartCheckoutIcon />}
                    >
                        Ödemeye Geç
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Sepetim;