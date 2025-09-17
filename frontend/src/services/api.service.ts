// src/services/axios.service.ts
import axios from 'axios';

export const axiosService = axios.create({
    baseURL: '/api'
});

axiosService.interceptors.request.use((config) => {
    const access = localStorage.getItem('accessToken');
    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});