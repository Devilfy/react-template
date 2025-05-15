import { useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { AUTH_TOKENS } from "../../shared/constants/token";
import { api } from "../../shared/api";

type Session = {
    id: string;
    exp: number;
    iat: number;
};

let refreshTokenPromise: Promise<string | null> | null = null;

export const useSession = () => {
    const [token, setToken] = useState(() => localStorage.getItem(AUTH_TOKENS.ACCESS));

    const login = useCallback((accessToken: string, refreshToken: string) => {
        localStorage.setItem(AUTH_TOKENS.ACCESS, accessToken);
        localStorage.setItem(AUTH_TOKENS.REFRESH, refreshToken);
        setToken(accessToken);
    }, []);

    const register = useCallback((accessToken: string, refreshToken: string) => {
        localStorage.setItem(AUTH_TOKENS.ACCESS, accessToken);
        localStorage.setItem(AUTH_TOKENS.REFRESH, refreshToken);
        setToken(accessToken);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_TOKENS.ACCESS);
        localStorage.removeItem(AUTH_TOKENS.REFRESH);
        setToken(null);
    }, []);

    const session = token ? jwtDecode<Session>(token) : null;

    const refreshToken = useCallback(async () => {
        if (!token) return null;

        const session = jwtDecode<Session>(token);
        if (session.exp < Date.now() / 1000) {
            if (!refreshTokenPromise) {
                refreshTokenPromise = api
                    .post("/auth/refresh", {
                        refreshToken: localStorage.getItem(AUTH_TOKENS.REFRESH),
                    })
                    .then((response) => {
                        const { accessToken, refreshToken } = response.data;
                        if (accessToken && refreshToken) {
                            login(accessToken, refreshToken);
                            return accessToken;
                        }
                        logout();
                        return null;
                    })
                    .catch(() => {
                        logout();
                        return null;
                    })
                    .finally(() => {
                        refreshTokenPromise = null;
                    });
            }

            return refreshTokenPromise;
        }

        return token;
    }, [token, login, logout]);

    return { refreshToken, login, register, logout, session };
};
