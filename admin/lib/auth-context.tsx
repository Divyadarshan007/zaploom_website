'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { authAPI } from './api-client';

interface AuthContextType {
    admin: any;
    loading: boolean;
    login: (token: string, admin: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const token = Cookies.get('auth_token');
            if (token) {
                try {
                    const res = await authAPI.getProfile();
                    if (res.success) {
                        setAdmin(res.admin);
                    } else {
                        Cookies.remove('auth_token');
                    }
                } catch (error: any) {
                    Cookies.remove('auth_token');
                }
            }
            setLoading(false);
        }
        checkAuth();
    }, []);

    const login = (token: string, admin: any) => {
        Cookies.set('auth_token', token, { expires: 7 });
        setAdmin(admin);
    };

    const logout = () => {
        Cookies.remove('auth_token');
        setAdmin(null);
        window.location.href = '/admin/login';
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
