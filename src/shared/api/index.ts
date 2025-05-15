import { AUTH_TOKENS } from "@/shared/constants/token";
import axios from "axios";

interface QueueItem {
    resolve: (value?: unknown) => void;
    reject: (reason?: Error | unknown) => void;
}

const createApi = (baseURL: string | undefined) => {
    const instance = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    let isRefreshing = false;
    let failedQueue: QueueItem[] = [];

    const processQueue = (error: Error | null = null) => {
        failedQueue.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve();
            }
        });
        failedQueue = [];
    };

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem(AUTH_TOKENS.ACCESS);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.data?.message && !originalRequest.url?.includes("/refresh")) {
                console.error(error.response.data.message);
            }

            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.url?.startsWith("/auth/")
            ) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(() => instance(originalRequest))
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const response = await instance.post("/auth/refresh", {
                        refreshToken: localStorage.getItem(AUTH_TOKENS.REFRESH),
                    });

                    const { accessToken, refreshToken } = response.data;
                    localStorage.setItem(AUTH_TOKENS.ACCESS, accessToken);
                    localStorage.setItem(AUTH_TOKENS.REFRESH, refreshToken);

                    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                    processQueue();

                    return instance(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError as Error);
                    localStorage.removeItem(AUTH_TOKENS.ACCESS);
                    localStorage.removeItem(AUTH_TOKENS.REFRESH);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export const api = createApi(import.meta.env.VITE_API_URL);
