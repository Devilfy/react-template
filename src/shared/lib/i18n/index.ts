import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { ru } from "./locales/ru";

i18n.use(initReactI18next).init({
    resources: { en, ru },
    lng: "ru",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
