import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // Giriş yapmış kullanıcı bilgisi
    const [isLoading, setIsLoading] = useState(true); // Sayfa ilk yüklendiğinde durumu kontrol etmek için

    // Sayfa ilk yüklendiğinde localStorage'dan kullanıcıyı kontrol et
    useEffect(() => {
        const storedUser = localStorage.getItem('barkodUser');
        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("localStorage'dan kullanıcı bilgisi okunurken hata:", error);
                localStorage.removeItem('barkodUser'); // Hatalı veriyi temizle
            }
        }
        setIsLoading(false); // Kontrol tamamlandı
    }, []);

    // Sahte Giriş Fonksiyonu
    const login = (userData) => {
        // Gerçekte burada API'ye istek atılır
        // Şimdilik gelen kullanıcı adını ve sahte bir token'ı saklayalım
        const fakeUser = { username: userData.username, email: userData.email, token: 'fake-jwt-token' };
        localStorage.setItem('barkodUser', JSON.stringify(fakeUser));
        setCurrentUser(fakeUser);
        console.log(`${fakeUser.username} giriş yaptı (sahte).`);
        return true; // Başarılı giriş
    };

    // Sahte Kayıt Fonksiyonu
    const register = (userData) => {
        // Gerçekte burada API'ye istek atılır
        console.log(`${userData.username} kayıt oldu (sahte).`, userData);
        // Otomatik giriş yaptırabiliriz veya login sayfasına yönlendirebiliriz
        // Şimdilik direkt login yapalım
        return login({ username: userData.username, email: userData.email });
    };

    // Çıkış Fonksiyonu
    const logout = () => {
        localStorage.removeItem('barkodUser');
        setCurrentUser(null);
        console.log("Çıkış yapıldı.");
    };

    const value = {
        currentUser,
        isLoadingAuth: isLoading, // Auth durumunun yüklenip yüklenmediği bilgisi
        login,
        register,
        logout
    };

    // Auth durumu yüklenene kadar çocukları render etmeyebiliriz veya bir yükleme ekranı gösterebiliriz.
    // Şimdilik direkt render ediyoruz.
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children} 
            {/* Veya isLoading true iken bir <LoadingSpinner /> gösterebilirsiniz */}
        </AuthContext.Provider>
    );
};