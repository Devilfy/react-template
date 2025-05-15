import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth";
import { useSession } from "@/services/session";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { useCallback } from "react";
import type { LoginFormData } from "./types";
import { toast } from "sonner";

export function useLogin() {
    const session = useSession();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            session.login(data.accessToken, data.refreshToken);
            toast.success("Вход в систему прошел успешно");
            navigate(ROUTES.HOME);
        },
        onError: () => {
            toast.error("Вход в систему прошел неудачно");
        },
    });

    const login = useCallback(
        (data: LoginFormData) => {
            loginMutation.mutate(data);
        },
        [loginMutation]
    );

    const errorMessage = loginMutation.isError ? loginMutation.error.message : undefined;

    return { login, isPending: loginMutation.isPending, errorMessage };
}
