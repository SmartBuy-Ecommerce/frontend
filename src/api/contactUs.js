import { apiClient } from './apiClient';

// Send contact us form to backend. Use a specific endpoint path the backend may expose.
export const contactUs = async (contactData) => {
  try {
    const response = await apiClient.post('/contact/contactus', contactData)
    return response.data;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};