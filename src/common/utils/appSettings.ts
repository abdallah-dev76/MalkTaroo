import { Storage, StorageKeys } from '@common/storage';
import { UnistylesRuntime } from 'react-native-unistyles';
import { getLocales } from 'react-native-localize';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

export type AppDirection = 'rtl' | 'ltr';

export const toggleLanguage = () => {
  const storedLang =
    Storage.getString(StorageKeys.Language) || getLocales()[0]?.languageCode;
  const newLang = storedLang === 'ar' ? 'en' : 'ar';

  Storage.setString(StorageKeys.Language, newLang);

  RNRestart.Restart();
  I18nManager.allowRTL(newLang === 'ar');
  I18nManager.forceRTL(newLang === 'ar');
};

export const getLanguage = () => {
  return (
    Storage.getString(StorageKeys.Language) || getLocales()[0]?.languageCode
  );
};

// Theme settings
export const isDark = Storage.getString('theme') === 'dark' || true;

export const toggleTheme = () => {
  const storedTheme = Storage.getString(StorageKeys.Theme);
  const newTheme = storedTheme === 'light' ? 'dark' : 'light';
  UnistylesRuntime.setTheme(newTheme);
  Storage.setString(StorageKeys.Theme, newTheme);
};
