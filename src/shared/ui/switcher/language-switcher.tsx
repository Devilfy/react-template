import { useTranslation } from "react-i18next";
import { Button } from "../kit/button";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const currentLang = localStorage.getItem("language") || i18n.language;
        const newLang = currentLang === "en" ? "ru" : "en";

        i18n.changeLanguage(newLang);
        localStorage.setItem("language", newLang);
    };

    const currentLang = localStorage.getItem("language") || i18n.language;

    return (
        <Button
            size="icon"
            onClick={toggleLanguage}
            className="text-sm font-medium text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark bg-transparent border border-accent-light/40 dark:border-accent-dark/40 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-all duration-200 rounded-lg">
            {currentLang === "en" ? "RU" : "EN"}
        </Button>
    );
};
