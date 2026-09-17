import { I18nManager } from 'react-native';

export type AppLanguage = 'ar' | 'en';
export type AppDirection = 'rtl' | 'ltr';

export const DEFAULT_LANGUAGE: AppLanguage = 'ar';

export const getSupportedLanguage = (language?: string | null): AppLanguage => {
  return language === 'en' || language === 'ar' ? language : DEFAULT_LANGUAGE;
};

export const getDirectionFromLanguage = (
  language?: string | null,
): AppDirection => {
  return getSupportedLanguage(language) === 'ar' ? 'rtl' : 'ltr';
};

export const isRTLLanguage = (language?: string | null) => {
  return getDirectionFromLanguage(language) === 'rtl';
};

export const applyAppDirection = (language?: string | null) => {
  const isRTL = isRTLLanguage(language);

  I18nManager.allowRTL(isRTL);

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
  }

  return isRTL;
};
