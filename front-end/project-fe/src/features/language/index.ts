import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en';
import vi from '@/locales/vi';

export const resources = {
  en,
  vi,
};
const lng = 'en';

void i18n.use(initReactI18next).init(
  {
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    debug: false,
    ns: ['demo'],
    defaultNS: 'demo',
    lng,
    resources,
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
  },
  (error, t) => {
    console.log('i18next: setup language successfully');
  },
);
export { i18n };
