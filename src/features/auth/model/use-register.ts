import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth";
import { useSession } from "@/services/session";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import type { RegisterFormData } from "./types";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import useUser from "@/services/user/model/use-user";

export function useRegister() {
    const { t } = useTranslation();
    const { updateUser } = useUser();
    const session = useSession();
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            session.register(data.accessToken, data.refreshToken);
            toast.success(t("register.success"));
            updateUser();
            navigate(ROUTES.HOME);
        },
        onError: () => {
            toast.error(t("register.error"));
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
