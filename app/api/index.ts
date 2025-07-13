import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '../constants';

type ToastFunction = {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    loading: (message: string) => string;
    dismiss: (id: string) => void;
};

let toastFunction: ToastFunction | null = null;

export const setToastFunction = (toast: ToastFunction) => {
    toastFunction = toast;
};

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (toastFunction && response.data?.message) {
            toastFunction.success(response.data.message);
        }
        return response;
    },
    (error: AxiosError) => {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as { message?: string };

            switch (status) {
                case 400:
                    errorMessage = data?.message || 'Bad request';
                    break;
                case 401:
                    errorMessage = data?.message || 'Unauthorized access';
                    break;
                case 403:
                    errorMessage = data?.message || 'Access forbidden';
                    break;
                case 404:
                    errorMessage = data?.message || 'Resource not found';
                    break;
                case 422:
                    errorMessage = data?.message || 'Validation error';
                    break;
                case 429:
                    errorMessage = data?.message || 'Too many requests';
                    break;
                case 500:
                    errorMessage = data?.message || 'Internal server error';
                    break;
                default:
                    errorMessage = data?.message || `Error ${status}`;
            }
        } else if (error.request) {
            errorMessage = 'Network error. Please check your connection.';
        } else {
            errorMessage = error.message || 'An unexpected error occurred';
        }

        if (toastFunction) {
            toastFunction.error(errorMessage);
        }

        return Promise.reject(error);
    }
);

export const get = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
};

export const post = async (url: string, data?: unknown) => {
    const response = await apiClient.post(url, data);
    return response.data;
};

export const put = async (url: string, data?: unknown) => {
    const response = await apiClient.put(url, data);
    return response.data;
};

export const patch = async (url: string, data?: unknown) => {
    const response = await apiClient.patch(url, data);
    return response.data;
};

export const del = async (url: string) => {
    const response = await apiClient.delete(url);
    return response.data;
};

export default apiClient;
