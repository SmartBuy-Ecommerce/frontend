import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    // Skip adding token for auth endpoints
    if (config.url.includes('/auth/')) {
      return config;
    }
    
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access - possibly expired token');
      // Optional: Redirect to login page or refresh token
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

