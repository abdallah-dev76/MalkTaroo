import { Storage, StorageKeys } from '@common/storage';
import i18n from '@translation/translation';
import { UnistylesRuntime } from 'react-native-unistyles';
import { getLocales } from 'react-native-localize';
import { I18nManager } from 'react-native';

export type AppDirection = 'rtl' | 'ltr';

export const isDark = Storage.getString('theme') === 'dark' || true;

export const isArabic = Storage.getString('language') === 'ar' || true;

export const toggleLanguage = async () => {
  const storedLang = Storage.getString(StorageKeys.Language);
  const newLang = storedLang === 'ar' ? 'en' : 'ar';

  Storage.setString(StorageKeys.Language, newLang);

  await i18n.changeLanguage(newLang);
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
