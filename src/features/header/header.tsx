import useUser from "@/services/user/model/use-user";
import { useSession } from "@/services/session";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { LanguageSwitcher } from "@/shared/ui/switcher/language-switcher";
import { ThemeSwitcher } from "@/shared/ui/switcher/theme-switcher";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Header = () => {
    const { t } = useTranslation();
    const { user, isAuthenticated, updateUser } = useUser();
    const { logout } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        updateUser();
        navigate(ROUTES.LOGIN);
    };

    return (
        <header className="h-16 sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-accent-light/10 dark:border-accent-dark/10 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">{/* <Navigation /> */}</div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated && user ? (
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex items-center cursor-pointer rounded-lg transition-all duration-200 hover:bg-accent-light/5 dark:hover:bg-accent-dark/5 p-2"
                                    onClick={() => navigate(`/profile/${user.id}`)}>
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary-light dark:ring-primary-dark">
                                        {!user.email ? (
                                            <></>
                                        ) : (
                                            <div className="w-full h-full bg-accent-light/10 dark:bg-accent-dark/10 flex items-center justify-center">
                                                <span className="text-sm font-medium text-text-light dark:text-text-dark">
                                                    {user?.email.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    className="text-sm font-medium text-text-light dark:text-text-dark hover:text-accent-light bg-transparent border border-accent-light/40 dark:border-accent-dark/40 dark:hover:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-all duration-200 rounded-lg"
                                    onClick={handleLogout}>
                                    {t("header.logout")}
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Button
                                    size="lg"
                                    className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary-light bg-transparent border border-accent-light/40 dark:border-accent-dark/40 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-all duration-200 rounded-lg"
                                    onClick={() => navigate(ROUTES.LOGIN)}>
                                    {t("header.login")}
                                </Button>
                                <Button
                                    size="lg"
                                    className="text-sm font-medium bg-primary-light dark:bg-primary-dark text-white hover:bg-accent-light dark:hover:bg-primary-dark/80 transition-all duration-200 rounded-lg"
                                    onClick={() => navigate(ROUTES.REGISTER)}>
                                    {t("header.register")}
                                </Button>
                            </div>
                        )}
                        <div className="flex items-center gap-3 pl-3 border-l border-accent-light/10 dark:border-accent-dark/10">
                            <ThemeSwitcher />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
