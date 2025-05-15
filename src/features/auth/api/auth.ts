import type { RegisterFormData } from "../model/types";
import { api } from "@/shared/api";
import type { LoginFormData } from "../model/types";

const authApi = {
    login: async (data: LoginFormData) => {
        const response = await api.post("/auth/sign-in", data);
        return response.data;
    },
    register: async (data: RegisterFormData) => {
        const response = await api.post("/auth/sign-up", data);
        return response.data;
    },
    refresh: async () => {
        const response = await api.post("/auth/refresh");
        return response.data;
    },
};

export default authApi;
