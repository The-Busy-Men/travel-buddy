import axios, { AxiosInstance } from 'axios';

let apiClient: AxiosInstance;

export const getApiClient = (): AxiosInstance => {
  if (!apiClient)
    apiClient = axios.create({ baseURL: 'http://localhost:8080' });
  return apiClient;
};
