import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import svTranslations from './locales/sv.json';
import enTranslations from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      sv: { translation: svTranslations },
      en: { translation: enTranslations }
    },
    lng: 'sv', // default language
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
