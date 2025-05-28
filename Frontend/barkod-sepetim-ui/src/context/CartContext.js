import React, { createContext, useState, useContext, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = useCallback((product) => { // Gelen 'product' objesinin urunID, urunAdi, fiyat içerdiğini varsayıyoruz
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.urunID === product.urunID);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.urunID === product.urunID
                        ? { ...item, quantity: (item.quantity || 0) + 1 } // quantity tanımsızsa 0 kabul et
                        : item
                );
            } else {
                // API'den gelen product objesi zaten doğru isimleri (urunID, urunAdi, fiyat) içermeli
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        console.log(`${product.urunAdi || 'Ürün'} sepete eklendi!`);
    }, []);

    const removeFromCart = useCallback((productId) => { // productId, urunID olacak
        setCartItems((prevItems) => {
            return prevItems.filter((item) => item.urunID !== productId);
        });
        console.log(`${productId} ID'li ürün sepetten çıkarıldı.`);
    }, []);

    const updateQuantity = useCallback((productId, amount) => { // productId, urunID olacak
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.urunID === productId
                    ? { ...item, quantity: Math.max(1, (item.quantity || 0) + amount) }
                    : item
            ).filter(item => item.quantity > 0);
        });
    }, []);

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.fiyat || 0;
            const quantity = item.quantity || 0;
            return total + (price * quantity);
        }, 0);
    };

    const cartItemCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0);

    const clearCart = useCallback(() => { // Ödeme sonrası için
        setCartItems([]);
        console.log("Sepet temizlendi.");
    }, []);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        cartItemCount,
        clearCart // clearCart'ı da ekledik
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};