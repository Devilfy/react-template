import { api } from "@/shared/api";
import type { User } from "../model/types";
const userApi = {
    getUser: async () => {
        const response = await api.get<User>("/user");
        return response.data;
    },
};

export default userApi;
