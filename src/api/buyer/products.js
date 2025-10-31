import {apiClient} from "../apiClient";

export const fetchBuyerProducts = async() => {
    try {
        const response = await apiClient.get('/product/getAll');
        return response.data;
    } catch (error) {
        console.error('Error fetching buyer products:', error);
        throw error;
    }
}