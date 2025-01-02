import { config, post } from '~/db';
import { refreshToken } from './urlApi';
import { optionRefreshToken } from './optionFormData';
import { LADDING } from './constants';

export const axiosInterceptor = (navigate) => {
    config.interceptors.response.use(
        (response) => response,
        async (err) => {
            const originalRequest = err.config;

            if (err.response?.status === 401 && !originalRequest._retry) {
                try {
                    originalRequest._retry = true;
                    const res = await post(refreshToken, null, optionRefreshToken);
                    const { data: accessToken } = res.data;
                    localStorage.setItem('accessToken', accessToken);
                    config.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return config(originalRequest);
                } catch (error) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('roleId');
                    navigate(LADDING);
                }
            }
        },
    );
};
