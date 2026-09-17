import i18n from '@translation/translation';
import { Storage, StorageKeys } from '@common/storage';
import { applyAppDirection } from './direction';

export const toggleLanguage = async () => {
  const storedLang = Storage.getString(StorageKeys.Language);
  const newLang = storedLang === 'ar' ? 'en' : 'ar';

  Storage.setString(StorageKeys.Language, newLang);

  await i18n.changeLanguage(newLang);
  applyAppDirection(newLang);
};

export const getLanguage = () => {
  return i18n.language;
};
