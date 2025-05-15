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
    const { user } = useUser();
    const { logout } = useSession();
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-accent-light/10 dark:border-accent-dark/10 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">{/* <Navigation /> */}</div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex items-center gap-3 cursor-pointer rounded-lg transition-all duration-200 hover:bg-accent-light/5 dark:hover:bg-accent-dark/5 p-2"
                                    onClick={() => navigate(`/profile/${user.id}`)}>
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary-light dark:ring-primary-dark">
                                        {/* {user.avatar ? (
                                            <Image
                                                src={getMediaUrl(user.avatar.url)}
                                                alt={user.username}
                                                fill
                                                sizes="32px"
                                                priority
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-accent-light/10 dark:bg-accent-dark/10 flex items-center justify-center">
                                                <span className="text-sm font-medium text-text-light dark:text-text-dark">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )} */}
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium text-text-light dark:text-text-dark">
                                            {/* {user.username} */}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    className="text-sm font-medium text-text-light dark:text-text-dark hover:text-accent-light bg-transparent border border-accent-light/40 dark:border-accent-dark/40 dark:hover:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-all duration-200 rounded-lg"
                                    onClick={() => {
                                        logout();
                                    }}>
                                    {t("header.logout")}
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Button
                                    className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary-light bg-transparent border border-accent-light/40 dark:border-accent-dark/40 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-all duration-200 rounded-lg"
                                    onClick={() => navigate(ROUTES.LOGIN)}>
                                    {t("header.login")}
                                </Button>
                                <Button
                                    className="text-sm font-medium bg-primary-light dark:bg-primary-dark text-white hover:bg-accent-light dark:hover:bg-accent-dark transition-all duration-200 rounded-lg"
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
