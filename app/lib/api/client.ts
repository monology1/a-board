import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiClient {
    private static instance: ApiClient;
    private readonly api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        // Request interceptor
        this.api.interceptors.request.use(
            (config) => {
                // Get token from cookie
                const token = this.getAuthToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Log request for debugging
                if (process.env.NODE_ENV === 'development') {
                    console.log('Request:', {
                        url: config.url,
                        method: config.method,
                        headers: config.headers,
                        data: config.data
                    });
                }

                return config;
            },
            (error) => {
                console.error('Request error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response) => {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Response:', {
                        status: response.status,
                        data: response.data
                    });
                }
                return response;
            },
            async (error) => {
                // Handle different error scenarios
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // Unauthorized - clear user data and redirect to login
                            localStorage.removeItem('userProfile');
                            window.location.href = '/signin';
                            break;
                        case 403:
                            // Forbidden - user doesn't have permission
                            console.error('Permission denied');
                            break;
                        case 404:
                            // Not found
                            console.error('Resource not found');
                            break;
                        case 500:
                            // Server error
                            console.error('Server error');
                            break;
                        default:
                            console.error('API error:', error.response.data);
                    }
                } else if (error.request) {
                    // Network error
                    console.error('Network error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    private getAuthToken(): string | null {
        try {
            const cookies = document.cookie.split(';');
            const tokenCookie = cookies.find(cookie =>
                cookie.trim().startsWith('access_token=')
            );
            if (tokenCookie) {
                return tokenCookie.split('=')[1].trim();
            }
            return null;
        } catch (error) {
            console.error('Error getting auth token:', error);
            return null;
        }
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    // Generic request method with error handling
    private async request<T>(
        method: string,
        url: string,
        data?: any,
        params?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.api.request({
                method,
                url,
                data,
                params,
                ...config
            });
            return response.data;
        } catch (error: any) {
            // Throw a more informative error
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'An error occurred during the request'
            );
        }
    }

    // API methods with strong typing
    async get<T>(
        url: string,
        params?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('GET', url, undefined, params, config);
    }

    async post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('POST', url, data, undefined, config);
    }

    async put<T>(
        url: string,
        data: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('PUT', url, data, undefined, config);
    }

    async delete<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('DELETE', url, undefined, undefined, config);
    }

    async patch<T>(
        url: string,
        data: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('PATCH', url, data, undefined, config);
    }
}

// Export a type for the response error
export interface ApiError {
    message: string;
    status: number;
    data?: any;
}