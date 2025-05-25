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
    CircularProgress, // Yükleme göstergesi için
    Alert // Hata/Başarı mesajları için
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios'; // axios'u import ediyoruz

// Backend API'mizin temel URL'si
// .env dosyasından almak daha iyi bir pratiktir ama şimdilik böyle kalsın.
const API_URL = 'http://localhost:5194/api'; // Sizdeki HTTP portu farklıysa güncelleyin

const Urunlerim = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Yeni ürün formu için state'ler
    const [newBarcode, setNewBarcode] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newStock, setNewStock] = useState('');

    // Ürünleri getiren fonksiyon
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

    // Sayfa ilk yüklendiğinde ürünleri çek
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
        setIsLoading(true); // Yükleme durumunu başlat

        const newProductData = {
            barkod: newBarcode,
            urunAdi: newProductName,
            fiyat: parseFloat(newPrice),
            stok: parseInt(newStock),
            // Aciklama gibi diğer alanlar backend'de varsayılan veya null olabilir
        };

        try {
            const response = await axios.post(`${API_URL}/urunler`, newProductData);
            // setProducts([...products, response.data]); // VEYA listeyi yeniden çek:
            fetchProducts(); // Listeyi güncel tutmak için yeniden çek
            setSuccessMessage(`'${response.data.urunAdi}' başarıyla eklendi!`);
            clearForm();
        } catch (err) {
            setError("Ürün eklenirken bir hata oluştu: " + (err.response?.data?.message || err.message));
            console.error("Ürün ekleme hatası:", err);
        }
        setIsLoading(false); // Yükleme durumunu bitir
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Ürünlerim ve Stok Yönetimi
            </Typography>

            {/* Mesajlar */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}


            <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>
                            Yeni Ürün Ekle
                        </Typography>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            <TextField
                                label="Barkod Numarası"
                                fullWidth
                                value={newBarcode}
                                onChange={(e) => setNewBarcode(e.target.value)}
                                disabled={isLoading}
                            />
                            <TextField
                                label="Ürün Adı"
                                fullWidth
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                                disabled={isLoading}
                            />
                            <TextField
                                label="Fiyat (TL)"
                                fullWidth
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                disabled={isLoading}
                            />
                            <TextField
                                label="Stok Adedi"
                                fullWidth
                                type="number"
                                value={newStock}
                                onChange={(e) => setNewStock(e.target.value)}
                                disabled={isLoading}
                            />
                        </Stack>
                        <Button
                            variant="contained"
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AddCircleIcon />}
                            sx={{ marginTop: '1rem', paddingTop: '10px', paddingBottom: '10px' }}
                            onClick={handleAddProduct}
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? "Ekleniyor..." : "Ürünü Ekle"}
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper sx={{ height: '100%' }}>
                        <TableContainer sx={{ height: '100%' }}>
                            {isLoading && products.length === 0 && ( // Sadece ilk yüklemede ve ürün yoksa
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <CircularProgress />
                                </Box>
                            )}
                            {!isLoading && products.length === 0 && (
                                <Typography sx={{ textAlign: 'center', padding: '2rem' }}>
                                    Gösterilecek ürün bulunamadı.
                                </Typography>
                            )}
                            {products.length > 0 && (
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow sx={{ '& .MuiTableCell-head': { backgroundColor: 'grey.200', fontWeight: 'bold' } }}>
                                            <TableCell>Barkod</TableCell>
                                            <TableCell>Ürün Adı</TableCell>
                                            <TableCell align="right">Fiyat</TableCell>
                                            <TableCell align="right">Stok</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.urunID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{product.barkod}</TableCell>
                                                <TableCell>{product.urunAdi}</TableCell>
                                                <TableCell align="right">{product.fiyat.toFixed(2)} TL</TableCell>
                                                <TableCell align="right">{product.stok}</TableCell>
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