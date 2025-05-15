import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth";
import { useSession } from "@/services/session";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import type { RegisterFormData } from "./types";
import { toast } from "sonner";

export function useRegister() {
    const session = useSession();
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            session.register(data.accessToken, data.refreshToken);
            toast.success("Регистрация прошла успешно");
            navigate(ROUTES.HOME);
        },
        onError: () => {
            toast.error("Регистрация прошла неудачно");
        },
    });

    const register = useCallback(
        (data: RegisterFormData) => {
            registerMutation.mutate(data);
        },
        [registerMutation]
    );

    const errorMessage = registerMutation.isError ? registerMutation.error.message : undefined;

    return { register, isPending: registerMutation.isPending, errorMessage };
}
