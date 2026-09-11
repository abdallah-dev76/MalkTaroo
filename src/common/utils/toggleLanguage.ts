import i18n from '@translation/translation';
import { I18nManager } from 'react-native';
import { Storage, StorageKeys } from '@common/storage';

export const toggleLanguage = async () => {
  const storedLang = Storage.getString(StorageKeys.Language);
  const newLang = storedLang === 'ar' ? 'en' : 'ar';

  const isArabic = newLang === 'ar';
  Storage.setString(StorageKeys.Language, newLang);

  await i18n.changeLanguage(newLang);
  I18nManager.allowRTL(isArabic);
  I18nManager.forceRTL(isArabic);
};

export const getLanguage = () => {
  return i18n.language;
};
