import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
    // Get all articles
    getArticles: async () => {
        const response = await axios.get(`${API_BASE_URL}/articles`);
        return response.data;
    },

    // Get single article by ID
    getArticle: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
        return response.data;
    },

    // Get latest article
    getLatestArticle: async () => {
        const response = await axios.get(`${API_BASE_URL}/articles/latest`);
        return response.data;
    },
};
