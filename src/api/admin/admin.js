import { apiClient } from "../apiClient";

export const getAllUsers = async() => {
    try {
        const response = await apiClient.get('/auth/getAllUsers');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const getUserById = async(id) => {
    try {
        const response = await apiClient.get(`/auth/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}