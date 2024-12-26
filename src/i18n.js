import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./en.json";
import vi from "./vi.json";
i18n
.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en
      },
      vi: {
        translation: vi
      }
    },
    lng: "vi", // set the default language
    fallbackLng: "vi", // fallback language if the current language translations are not found
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
