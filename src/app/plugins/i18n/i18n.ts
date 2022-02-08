import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { langDetector } from './lang-detector';
import { PREFIX } from 'shared/constants/index';

i18n
  .use(Backend)
  .use(langDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    load: 'languageOnly',
    lng: 'ru',
    preload: ['ru'],
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: `${PREFIX}/locales/{{lng}}/translation.json`,
    },
  });

export default i18n;
