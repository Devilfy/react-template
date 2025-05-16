import type { FormFieldProps } from "@/shared/ui/form/form.types";
import FormBuilder from "@/shared/ui/form/form-builder";
import { useRegister } from "../model/use-register";
import { registerSchema, type RegisterFormData } from "../model/types";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
    const { t } = useTranslation();
    const { register, isPending } = useRegister();

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

    const handleSubmit = async (data: RegisterFormData) => {
        await register(data);
    };

    return (
        <div>
            <FormBuilder
                fields={fields}
                schema={registerSchema}
                submitButton={{
                    text: t("register.registerButton"),
                    isLoading: isPending,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default RegisterForm;
