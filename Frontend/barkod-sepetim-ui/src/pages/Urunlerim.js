import React, { useState } from 'react';
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
    Stack // Form için Stack kullanalım
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FAKE_PRODUCTS } from '../data/products';

const Urunlerim = () => {
    const [newBarcode, setNewBarcode] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newStock, setNewStock] = useState('');

    const [products, setProducts] = useState(FAKE_PRODUCTS);

    const handleAddProduct = () => {
        if (!newBarcode || !newProductName || !newPrice || !newStock) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        const newProduct = {
            id: Date.now(),
            barcode: newBarcode,
            productName: newProductName,
            price: parseFloat(newPrice),
            stock: parseInt(newStock)
        };

        console.log("Yeni Ürün Eklendi:", newProduct);
        setProducts([...products, newProduct]);

        setNewBarcode('');
        setNewProductName('');
        setNewPrice('');
        setNewStock('');

        alert("Ürün (geçici olarak) eklendi!");
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Ürünlerim ve Stok Yönetimi
            </Typography>

            {/* Grid container'ına display: 'flex' ekleyebiliriz veya item'lara height: '100%' */}
            <Grid container spacing={3} sx={{ alignItems: 'stretch' }}> {/* alignItems: 'stretch' ekledik */}

                {/* Sol Taraf: Yeni Ürün Ekleme Formu */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{
                        padding: '1.5rem',
                        height: '100%', // <<<=== Yüksekliği %100 yaptık
                        display: 'flex', // <<<=== Flexbox ekledik
                        flexDirection: 'column' // <<<=== Dikey sıralama
                    }}>
                        <Typography variant="h6" gutterBottom>
                            Yeni Ürün Ekle
                        </Typography>
                        {/* Stack ile form elemanlarını düzenliyoruz */}
                        <Stack spacing={2} sx={{ flexGrow: 1 }}> {/* flexGrow: 1 ile alanı doldurur */}
                            <TextField
                                label="Barkod Numarası"
                                fullWidth
                                value={newBarcode}
                                onChange={(e) => setNewBarcode(e.target.value)}
                            />
                            <TextField
                                label="Ürün Adı"
                                fullWidth
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                            />
                            <TextField
                                label="Fiyat (TL)"
                                fullWidth
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                            <TextField
                                label="Stok Adedi"
                                fullWidth
                                type="number"
                                value={newStock}
                                onChange={(e) => setNewStock(e.target.value)}
                            />
                        </Stack>
                        {/* Butonu en alta itmek için mt: 'auto' */}
                        <Button
                            variant="contained"
                            startIcon={<AddCircleIcon />}
                            sx={{ marginTop: 'auto', paddingTop: '10px', paddingBottom: '10px' }} // mt: 'auto' yerine '1rem' daha iyi olabilir
                            onClick={handleAddProduct}
                            fullWidth
                        >
                            Ürünü Ekle
                        </Button>
                    </Paper>
                </Grid>

                {/* Sağ Taraf: Ürün Listesi */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ height: '100%' }}> {/* <<<=== Yüksekliği %100 yaptık */}
                        <TableContainer sx={{ height: '100%' }}> {/* Tabloya da yükseklik */}
                            <Table stickyHeader> {/* Başlık sabit kalsın */}
                                <TableHead>
                                    <TableRow sx={{
                                        '& .MuiTableCell-head': { // Başlık hücrelerine stil
                                            backgroundColor: 'grey.200',
                                            fontWeight: 'bold'
                                        }
                                    }}>
                                        <TableCell>Barkod</TableCell>
                                        <TableCell>Ürün Adı</TableCell>
                                        <TableCell align="right">Fiyat</TableCell>
                                        <TableCell align="right">Stok</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow
                                            key={product.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }} // Son satırın alt çizgisini kaldır
                                        >
                                            <TableCell>{product.barcode}</TableCell>
                                            <TableCell>{product.productName}</TableCell>
                                            <TableCell align="right">{product.price.toFixed(2)} TL</TableCell>
                                            <TableCell align="right">{product.stock}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Urunlerim;