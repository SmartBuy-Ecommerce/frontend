import { apiClient } from '../apiClient';

// Fetch products for a specific seller
export const fetchSellerProducts = async () => {
  try {
    const response = await apiClient.get('/product/getAll');
    return response.data;
  } catch (error) {
    console.error('Error fetching seller products:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    // console.log(productData);
    const response = await apiClient.post('/product/addProduct', productData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.patch(`/product/updateProduct/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/product/deleteProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};