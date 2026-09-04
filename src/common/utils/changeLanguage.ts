import i18n from '@translation/index';
import { I18nManager } from 'react-native';

export const changeLanguage = async (lang: 'en' | 'ar') => {
  const isArabic = lang === 'ar';

  await i18n.changeLanguage(lang);

  I18nManager.allowRTL(isArabic);
  I18nManager.forceRTL(isArabic);
};
