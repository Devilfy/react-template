import type { FormFieldProps } from "@/shared/ui/form/form.types";
import FormBuilder from "@/shared/ui/form/form-builder";
import { useLogin } from "../model/use-login";
import { loginSchema, type LoginFormData } from "../model/types";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
    const { login, isPending } = useLogin();
    const { t } = useTranslation();

    const fields: FormFieldProps[] = [
        {
            name: "email",
            label: t("input.email"),
            type: "email",
            required: true,
        },
        {
            name: "password",
            label: t("input.password"),
            type: "password",
            required: true,
        },
    ];

    const handleSubmit = async (data: LoginFormData) => {
        await login(data);
    };

    return (
        <div>
            <FormBuilder
                fields={fields}
                schema={loginSchema}
                submitButton={{
                    text: t("login.loginButton"),
                    isLoading: isPending,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default LoginForm;
