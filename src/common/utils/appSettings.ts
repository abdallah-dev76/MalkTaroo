import { Storage, StorageKeys } from '@common/storage';
import { UnistylesRuntime } from 'react-native-unistyles';
import { getLocales } from 'react-native-localize';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

export type AppDirection = 'rtl' | 'ltr';

export const isDark = Storage.getString('theme') === 'dark' || true;

export const isArabic = Storage.getString('language') === 'ar' || true;

export const toggleLanguage = () => {
  const storedLang = Storage.getString(StorageKeys.Language);
  const newLang = storedLang === 'ar' ? 'en' : 'ar';

  Storage.setString(StorageKeys.Language, newLang);

  I18nManager.allowRTL(newLang === 'ar');
  I18nManager.forceRTL(newLang === 'ar');
  RNRestart.Restart();
  applyAppDirection();
};

export const getLanguage = () => {
  return (
    Storage.getString(StorageKeys.Language) || getLocales()[0]?.languageCode
  );
};

export const applyAppDirection = () => {
  const languageDirection = getLanguage() === 'ar' ? 'rtl' : 'ltr';
  const isRTL = languageDirection === 'rtl';

  I18nManager.allowRTL(isRTL);

  if (isArabic !== isRTL) {
    I18nManager.forceRTL(isRTL);
  }

  return isRTL;
};

export const toggleTheme = () => {
  const storedTheme = Storage.getString(StorageKeys.Theme);
  const newTheme = storedTheme === 'light' ? 'dark' : 'light';
  UnistylesRuntime.setTheme(newTheme);
  Storage.setString(StorageKeys.Theme, newTheme);
};
