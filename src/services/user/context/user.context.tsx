import type { ReactNode } from "react";
import { createContext, useState } from "react";
import { AUTH_TOKENS } from "@/shared/constants/token";
import type { User } from "../model/types";
import userApi from "../api/user";

interface UserContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    updateUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        () => !!localStorage.getItem(AUTH_TOKENS.ACCESS)
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateUser = async () => {
        const token = localStorage.getItem(AUTH_TOKENS.ACCESS);
        if (token) {
            try {
                setIsLoading(true);
                const user = await userApi.getUser();
                setUser(user);
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
                localStorage.removeItem(AUTH_TOKENS.ACCESS);
                localStorage.removeItem(AUTH_TOKENS.REFRESH);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, isAuthenticated, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
