import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { ru } from "./locales/ru";

const defaultLang = "ru";
const savedLanguage = localStorage.getItem("language") || defaultLang;

if (!localStorage.getItem("language")) {
    localStorage.setItem("language", defaultLang);
}

i18n.use(initReactI18next).init({
    resources: { en, ru },
    lng: savedLanguage,
    fallbackLng: defaultLang,
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

export default i18n;
