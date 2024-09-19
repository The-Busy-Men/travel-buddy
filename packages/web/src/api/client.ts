import axios, { AxiosInstance } from 'axios';

let apiClient: AxiosInstance;

export const getApiClient = (): AxiosInstance => {
  if (!apiClient) {
    apiClient = axios.create({
      baseURL: 'http://localhost:8080',
      withCredentials: true,
    });
    apiClient.interceptors.request.use(
      (config) => {
        const token = window.localStorage.getItem('access_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the Authorization header
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
  return apiClient;
};
