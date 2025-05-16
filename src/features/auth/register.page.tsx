import { useTranslation } from "react-i18next";
import { AuthLayout } from "./ui/auth-layout";
import RegisterForm from "./ui/register-form";
import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function RegisterPage() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t("register.title")}</title>
            </Helmet>
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
        </>
    );
}

export const Component = RegisterPage;
