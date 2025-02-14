import axios, {AxiosInstance, AxiosResponse} from "axios";

export class ApiClient {
    private static instance: ApiClient;
    private readonly api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    // Handle token refresh or logout
                }
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    // Generic request method
    private async request<T>(
        method: string,
        url: string,
        data?: never,
        params?: never
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.api.request({
            method,
            url,
            data,
            params,
        });
        return response.data;
    }


    // API methods
    async get<T>(url: string, params?: never): Promise<T> {
        return this.request<T>('GET', url, undefined, params);
    }

    async post<T>(url: string, data: never): Promise<T> {
        return this.request<T>('POST', url, data);
    }

    async put<T>(url: string, data: never): Promise<T> {
        return this.request<T>('PUT', url, data);
    }

    async delete<T>(url: string): Promise<T> {
        return this.request<T>('DELETE', url);
    }
}