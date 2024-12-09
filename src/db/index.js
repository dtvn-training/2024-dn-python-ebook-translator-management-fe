import axios from 'axios';
const config = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
});

export const get = async (url, options) => {
    try {
        const response = await config.get(url, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const post = async (url, data, options) => {
    try {
        const response = await config.post(url, data, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const put = async (url, data, options) => {
    try {
        const response = await config.put(url, data, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};
