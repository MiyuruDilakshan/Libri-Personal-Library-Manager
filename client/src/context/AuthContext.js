import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user on mount
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Assuming /auth/me returns the user object
                    const response = await api.get('/auth/me');
                    setUser(response.data);
                } catch (err) {
                    console.error("Failed to load user", err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, ...userData } = response.data;
            
            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed';
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const register = async (name, email, password) => {
        setError(null);
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const { token, ...userData } = response.data; 

            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed';
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const googleLogin = async (accessToken) => {
        setError(null);
        try {
            const response = await api.post('/auth/google', { accessToken });
            const { token, ...userData } = response.data;

            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'Google Login failed';
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        googleLogin,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
