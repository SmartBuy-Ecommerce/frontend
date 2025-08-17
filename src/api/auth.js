import {apiClient}  from './apiClient'; // 👈 Now using named import

// Test backend connection (no real auth)
export const checkBackendConnection = async () => {
  const response = await apiClient.get('/health');
  return response.data; // { status: "OK" }
};

// Mock login (replace with real implementation later)
export const mockLogin = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data; // { message: "Login successful (mock)" }
};

// Mock signup (replace later)
export const mockSignup = async (userData) => {
  const response = await apiClient.post('/auth/signup', userData);
  return response.data; // { message: "Signup successful (mock)" }
};