import { Storage, StorageKeys } from '@common/storage';
import { UnistylesRuntime } from 'react-native-unistyles';
import { getLocales } from 'react-native-localize';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import i18n from '@translation/translation';

export const toggleLanguage = async () => {
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
  const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  await i18n.changeLanguage(newLanguage);

  Storage.setString('language', newLanguage);
  const isRTL = newLanguage === 'ar';
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  RNRestart?.restart();
};

export const getLanguage = () => {
  return (
    Storage.getString(StorageKeys.Language) || getLocales()[0]?.languageCode
  );
};

// Theme settings
export const isDark = Storage.getString('theme') === 'dark' || true;

export const toggleTheme = () => {
  const newTheme = UnistylesRuntime.themeName === 'light' ? 'dark' : 'light';
  UnistylesRuntime.setTheme(newTheme);
  Storage.setString(StorageKeys.Theme, newTheme);
};

export const isArabic = getLanguage() === 'ar';
