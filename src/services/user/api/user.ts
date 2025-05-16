import { api } from "@/shared/api";
import type { User } from "../model/types";
const userApi = {
    getUser: async () => {
        const response = await api.get<User>("/users/profile");
        return response.data;
    },
};

export default userApi;
