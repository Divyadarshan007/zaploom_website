import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_URL = rawUrl.replace(/\/?$/, '') + (rawUrl.endsWith('/api') ? '' : '/api');

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('auth_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
        return response;
    },
    (error: AxiosError) => {
        console.error(`[API Error] ${error.config?.url}:`, error.response?.data || error.message);
        if (error.response?.status === 401) {
            Cookies.remove('auth_token');
            if (typeof window !== 'undefined') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

// Auth
export const authAPI = {
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/admin/auth/login', { email, password });
        return response.data;
    },
    logout: async () => {
        const response = await apiClient.post('/admin/auth/logout');
        return response.data;
    },
    getProfile: async () => {
        const response = await apiClient.get('/admin/auth/profile');
        return response.data;
    },
};

// Generic CRUD methods
const createCrudAPI = (endpoint: string) => ({
    getAll: async (params?: any) => {
        const response = await apiClient.get(`/admin/${endpoint}`, { params });
        return response.data;
    },
    getById: async (id: string) => {
        const response = await apiClient.get(`/admin/${endpoint}/${id}`);
        return response.data;
    },
    create: async (data: any) => {
        const response = await apiClient.post(`/admin/${endpoint}`, data);
        return response.data;
    },
    update: async (id: string, data: any) => {
        const response = await apiClient.put(`/admin/${endpoint}/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/admin/${endpoint}/${id}`);
        return response.data;
    },
});

// Zaploom Entities
export const productAPI = createCrudAPI('product');
export const testimonialAPI = createCrudAPI('testimonial');
export const teamMemberAPI = createCrudAPI('team-member');
export const faqAPI = createCrudAPI('faq');
export const serviceAPI = createCrudAPI('service');
export const contactInquiryAPI = {
    ...createCrudAPI('contact-inquiry'),
    markAsRead: async (id: string) => {
        const response = await apiClient.put(`/admin/contact-inquiry/${id}/read`);
        return response.data;
    },
};

// Page/Global Settings
export const pageSettingsAPI = {
    getHome: () => apiClient.get('/admin/page-settings/home').then((r) => r.data),
    updateHome: (data: any) => apiClient.put('/admin/page-settings/home', data).then((r) => r.data),
    getAbout: () => apiClient.get('/admin/page-settings/about').then((r) => r.data),
    updateAbout: (data: any) => apiClient.put('/admin/page-settings/about', data).then((r) => r.data),
    getContact: () => apiClient.get('/admin/page-settings/contact').then((r) => r.data),
    updateContact: (data: any) => apiClient.put('/admin/page-settings/contact', data).then((r) => r.data),
    getGlobal: () => apiClient.get('/admin/page-settings/global').then((r) => r.data),
    updateGlobal: (data: any) => apiClient.put('/admin/page-settings/global', data).then((r) => r.data),
};

// Upload
export const uploadAPI = {
    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await apiClient.post('/admin/upload/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
};

export default apiClient;
