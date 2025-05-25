import React, { createContext, useState, useContext, useCallback } from 'react';

// 1. Context'i oluştur
const CartContext = createContext();

// 2. Bu Context'i kolayca kullanmak için bir custom hook oluştur
export const useCart = () => {
    return useContext(CartContext);
};

// 3. Context'i sağlayacak Provider bileşenini oluştur
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); // Sepetteki ürünleri tutan state

    // Sepete Ürün Ekleme Fonksiyonu
    const addToCart = useCallback((product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem) {
                // Ürün zaten varsa miktarını artır
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Ürün yoksa yeni ekle (miktar 1 olarak)
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        console.log(`${product.productName} sepete eklendi!`);
    }, []);

    // Sepetten Ürün Çıkarma Fonksiyonu
    const removeFromCart = useCallback((productId) => {
        setCartItems((prevItems) => {
            return prevItems.filter((item) => item.id !== productId);
        });
        console.log(`${productId} ID'li ürün sepetten çıkarıldı.`);
    }, []);

    // Miktar Güncelleme Fonksiyonu
    const updateQuantity = useCallback((productId, amount) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) } // Miktar 1'den az olmasın
                    : item
            ).filter(item => item.quantity > 0); // Miktar 0 olursa çıkar (isteğe bağlı)
        });
    }, []);

    // Sepet Toplamını Hesaplama (İleride kullanışlı olabilir)
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };


    // Provider'ın dışarıya sunacağı değerler
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        cartItemCount: cartItems.reduce((count, item) => count + item.quantity, 0) // Toplam ürün sayısı
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};