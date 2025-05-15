import { useTranslation } from "react-i18next";
import { AuthLayout } from "./ui/auth-layout";
import LoginForm from "./ui/login-form";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

function LoginPage() {
    const { t } = useTranslation();

    return (
        <AuthLayout
            form={<LoginForm />}
            title={t("login.title")}
            description={t("login.description")}
            footerText={
                <>
                    <span>
                        {t("login.footerText")}{" "}
                        <Link to={ROUTES.REGISTER}>{t("login.footerLink")}</Link>
                    </span>
                </>
            }
        />
    );
}

export const Component = LoginPage;
