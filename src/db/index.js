import axios from 'axios';
const config = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
        // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
    timeout: 10000,
});

export const get = async (url, options) => {
    try {
        const response = await config.get(url);
        return response;
    } catch (error) {
        throw error;
    }
};

export const post = async (url, data, options) => {
export const post = async (url, data, options) => {
    try {
        const response = await config.post(url, data, options);
        return response;
    } catch (error) {
        throw error;
    }
};

export const put = async (url, data, options) => {
    try {
        const response = await config.put(url, data, options);
        return response;
    } catch (error) {
        throw error;
    }
};
