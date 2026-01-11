import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    // Mock user state. In a real app, this would check localStorage or validate a token.
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for an existing session
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // Mock login
        const mockUser = {
            id: '1',
            name: 'Miyuru Dilakshan',
            email: 'user@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Miyuru+Dilakshan&background=0D9488&color=fff',
            ...userData
        };
        setUser(mockUser);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mockUser');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
