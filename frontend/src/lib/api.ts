import axios, { InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (data: { email: string; password: string; name: string }) => {
    const response = await api.post('/users/register', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/users/login', data);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (data: { name?: string; email?: string; password?: string }) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async (params?: { category?: string; featured?: boolean; new?: boolean; sortBy?: string; minPrice?: number; maxPrice?: number }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },
  addReview: async (productId: string, data: { rating: number; comment: string }) => {
    const response = await api.post(`/products/${productId}/reviews`, data);
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  create: async (data: {
    items: Array<{
      productId: string;
      name: string;
      price: number;
      quantity: number;
      options: {
        materials: string;
        customization: string;
      };
    }>;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    paymentMethod: string;
  }) => {
    const response = await api.post('/orders', data);
    return response.data;
  },
  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  cancel: async (id: string) => {
    const response = await api.post(`/orders/${id}/cancel`);
    return response.data;
  },
};

// Wishlist API
export const wishlistAPI = {
  get: async () => {
    const response = await api.get('/users/wishlist');
    return response.data;
  },
  toggle: async (productId: string) => {
    const response = await api.post(`/users/wishlist/${productId}`);
    return response.data;
  },
}; 