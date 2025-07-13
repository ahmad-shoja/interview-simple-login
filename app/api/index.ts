import axios from 'axios';
import { BASE_URL } from '../constants';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
};
