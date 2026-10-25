import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';
import { Storage, StorageKeys } from '@common/storage';
import { getLocales } from 'react-native-localize';

const storedLanguage = Storage.getString(StorageKeys.Language);
const deviceLanguage = getLocales()[0]?.languageCode;
const initialLanguage = storedLanguage || deviceLanguage || 'ar';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(error => {
    console.error('i18n initialization failed:', error);
  });

export default i18n;
