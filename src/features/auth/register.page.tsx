import { useTranslation } from "react-i18next";
import { AuthLayout } from "./ui/auth-layout";
import RegisterForm from "./ui/register-form";
import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";

function RegisterPage() {
    const { t } = useTranslation();

    return (
        <AuthLayout
            form={<RegisterForm />}
            title={t("register.title")}
            description={t("register.description")}
            footerText={
                <>
                    <span>
                        {t("register.footerText")}{" "}
                        <Link to={ROUTES.LOGIN}>{t("register.footerLink")}</Link>
                    </span>
                </>
            }
        />
    );
}

export const Component = RegisterPage;
