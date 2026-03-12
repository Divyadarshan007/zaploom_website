import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor to extract data
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error);
    }
);

// Common endpoints for public data
export const commonAPI = {
    getProducts: () => api.get('/common/products'),
    getProductBySlug: (slug) => api.get(`/common/products/${slug}`),
    getTestimonials: () => api.get('/common/testimonials'),
    getTeam: () => api.get('/common/team-members'),
    getFAQs: () => api.get('/common/faqs'),
    getServices: (featured = false) => api.get('/common/services', { params: { featured } }),
    getHomeSettings: () => api.get('/common/page-settings/home'),
    getAboutSettings: () => api.get('/common/page-settings/about'),
    getContactSettings: () => api.get('/common/page-settings/contact'),
    getGlobalSettings: () => api.get('/common/page-settings/global'),
    submitInquiry: (data) => api.post('/common/contact-inquiry', data),
    getBlogs: (params) => api.get('/common/blogs', { params }),
    getBlogBySlug: (slug) => api.get(`/common/blogs/${slug}`),
};

export default api;
