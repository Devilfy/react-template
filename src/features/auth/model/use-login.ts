import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth";
import { useSession } from "@/services/session";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { useCallback } from "react";
import type { LoginFormData } from "./types";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import useUser from "@/services/user/model/use-user";
export function useLogin() {
    const { t } = useTranslation();
    const { updateUser } = useUser();
    const session = useSession();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            session.login(data.accessToken, data.refreshToken);
            toast.success(t("login.success"));
            updateUser();
            navigate(ROUTES.HOME);
        },
        onError: () => {
            toast.error(t("login.error"));
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
