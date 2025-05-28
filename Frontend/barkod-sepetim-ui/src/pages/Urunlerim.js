import React, { useState, useEffect, useCallback } from 'react';
import {
    Typography,
    Box,
    Paper,
    TextField,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    CircularProgress,
    Alert,
    IconButton // Düzenle/Sil ikonları için
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Form başlığı için
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'; // Yeni ikon
import axios from 'axios';

const API_URL = 'http://localhost:5194/api';
const açıkGriRenk = 'grey.100'; // MUI tema renklerinden

const Urunlerim = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [newBarcode, setNewBarcode] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newStock, setNewStock] = useState('');
    const [isAddingProduct, setIsAddingProduct] = useState(false);


    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/urunler`);
            setProducts(response.data);
        } catch (err) {
            setError("Ürünler yüklenirken bir hata oluştu: " + (err.response?.data?.message || err.message));
            console.error("Ürünleri getirme hatası:", err);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const clearForm = () => {
        setNewBarcode('');
        setNewProductName('');
        setNewPrice('');
        setNewStock('');
    };

    const handleAddProduct = async () => {
        if (!newBarcode || !newProductName || !newPrice || !newStock) {
            setError("Lütfen tüm ürün bilgilerini doldurun.");
            setSuccessMessage(null);
            return;
        }
        setError(null);
        setSuccessMessage(null);
        setIsAddingProduct(true);

        const newProductData = {
            barkod: newBarcode,
            urunAdi: newProductName,
            fiyat: parseFloat(newPrice),
            stok: parseInt(newStock),
        };

        try {
            const response = await axios.post(`${API_URL}/urunler`, newProductData);
            fetchProducts();
            setSuccessMessage(`'${response.data.urunAdi}' başarıyla eklendi!`);
            clearForm();
        } catch (err) {
            setError("Ürün eklenirken bir hata oluştu: " + (err.response?.data?.message || err.message));
            console.error("Ürün ekleme hatası:", err);
        }
        setIsAddingProduct(false);
    };

    const handleEditProduct = (productId) => {
        console.log("Düzenlenecek Ürün ID:", productId);
        // İleride düzenleme modal/sayfası açılabilir
        alert("Düzenleme özelliği henüz aktif değil.");
    };

    const handleDeleteProduct = (productId) => {
        console.log("Silinecek Ürün ID:", productId);
        // İleride silme onayı ve API çağrısı eklenecek
        alert("Silme özelliği henüz aktif değil.");
    };


    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                Ürün Yönetimi
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                Kayıtlı ürünlerinizi görüntüleyin, yeni ürün ekleyin veya mevcutları düzenleyin.
            </Typography>

            {/* Mesajlar */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

            <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Grid item xs={12} md={4}>
                    <Paper variant="outlined" sx={{ padding: '1.5rem', height: '100%', borderRadius: '12px', backgroundColor: açıkGriRenk }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2}}>
                            <PlaylistAddCheckIcon color="primary" />
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                Yeni Ürün Ekle
                            </Typography>
                        </Stack>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            <TextField
                                label="Barkod Numarası"
                                fullWidth
                                size="small"
                                value={newBarcode}
                                onChange={(e) => setNewBarcode(e.target.value)}
                                disabled={isAddingProduct}
                                sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                            />
                            <TextField
                                label="Ürün Adı"
                                fullWidth
                                size="small"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                                disabled={isAddingProduct}
                                sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                            />
                            <TextField
                                label="Fiyat (TL)"
                                fullWidth
                                type="number"
                                size="small"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                disabled={isAddingProduct}
                                sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                            />
                            <TextField
                                label="Stok Adedi"
                                fullWidth
                                type="number"
                                size="small"
                                value={newStock}
                                onChange={(e) => setNewStock(e.target.value)}
                                disabled={isAddingProduct}
                                sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                            />
                        </Stack>
                        <Button
                            variant="contained"
                            startIcon={isAddingProduct ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineIcon />}
                            sx={{ 
                                marginTop: '1.5rem', 
                                py: 1.2,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: '600'
                            }}
                            onClick={handleAddProduct}
                            fullWidth
                            disabled={isAddingProduct}
                        >
                            {isAddingProduct ? "Ekleniyor..." : "Ürünü Ekle"}
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper variant="outlined" sx={{ height: '100%', borderRadius: '12px', backgroundColor: açıkGriRenk, p: 2 }}>
                         <Typography variant="h6" sx={{ fontWeight: 500, mb:1.5 }}>Kayıtlı Ürünler</Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px'}}> {/* Tabloyu da bir Paper içine alalım */}
                            {isLoading && products.length === 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                    <CircularProgress />
                                </Box>
                            )}
                            {!isLoading && products.length === 0 && (
                                <Typography sx={{ textAlign: 'center', padding: '2rem', color: 'text.secondary' }}>
                                    Gösterilecek ürün bulunamadı.
                                </Typography>
                            )}
                            {products.length > 0 && (
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow sx={{ '& .MuiTableCell-head': { backgroundColor: 'grey.200', fontWeight: 'bold' } }}>
                                            <TableCell>Barkod</TableCell>
                                            <TableCell>Ürün Adı</TableCell>
                                            <TableCell align="right">Fiyat</TableCell>
                                            <TableCell align="right">Stok</TableCell>
                                            <TableCell align="center">Aksiyonlar</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow hover key={product.urunID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">{product.barkod}</TableCell>
                                                <TableCell>{product.urunAdi}</TableCell>
                                                <TableCell align="right">{product.fiyat.toFixed(2)} TL</TableCell>
                                                <TableCell align="right">{product.stok}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small" onClick={() => handleEditProduct(product.urunID)} color="info">
                                                        <EditOutlinedIcon fontSize="small"/>
                                                    </IconButton>
                                                    <IconButton size="small" onClick={() => handleDeleteProduct(product.urunID)} color="error">
                                                        <DeleteOutlineOutlinedIcon fontSize="small"/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Urunlerim;