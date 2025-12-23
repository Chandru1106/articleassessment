import axios from 'axios';
import { config } from '../config.js';

/**
 * Fetch latest article from Laravel API
 */
export async function getLatestArticle() {
    const response = await axios.get(`${config.laravelApiUrl}/articles/latest`);
    return response.data;
}

/**
 * Update article with enhanced content
 */
export async function updateArticle(id, data) {
    const response = await axios.put(`${config.laravelApiUrl}/articles/${id}`, data);
    return response.data;
}

/**
 * Get all articles
 */
export async function getArticles() {
    const response = await axios.get(`${config.laravelApiUrl}/articles`);
    return response.data;
}
