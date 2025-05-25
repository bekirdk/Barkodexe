export const FAKE_PRODUCTS = [
    { id: 1, barcode: '8690000111222', productName: 'Süt 1L', price: 25.50, stock: 50 },
    { id: 2, barcode: '8690000333444', productName: 'Ekmek', price: 10.00, stock: 120 },
    { id: 3, barcode: '8690000555666', productName: 'Yumurta (15\'li)', price: 55.75, stock: 30 },
    { id: 4, barcode: '8690000777888', productName: 'Peynir 500g', price: 150.00, stock: 15 },
    { id: 5, barcode: '12345', productName: 'Test Ürünü', price: 1.00, stock: 99 },
];

// Barkoda göre ürünü bulan basit bir fonksiyon
export const findProductByBarcode = (barcode) => {
    return FAKE_PRODUCTS.find(p => p.barcode === barcode);
};