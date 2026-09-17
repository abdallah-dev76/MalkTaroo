import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';
import { getLocales } from 'react-native-localize';
import { Storage, StorageKeys } from '@common/storage';
import {
  applyAppDirection,
  getSupportedLanguage,
} from '@common/utils/direction';

const deviceLanguage = getLocales()[0]?.languageCode;

const storedLanguage = Storage.getString(StorageKeys.Language);

const initialLanguage = getSupportedLanguage(storedLanguage ?? deviceLanguage);

applyAppDirection(initialLanguage);

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
});

Storage.setString(StorageKeys.Language, initialLanguage);

export default i18n;
