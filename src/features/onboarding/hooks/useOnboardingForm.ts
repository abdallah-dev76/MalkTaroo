import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { ProfileState } from '@store/slices/profileSlice';
import {
  BirthdateParts,
  getBirthdateObject,
  getDaysInMonth,
  getValidatedAge,
  parseBirthdatePart,
} from '@common/utils/date';
import { getZodiacFromDate } from '@common/utils/zodiac';

export type OnboardingInputs = {
  firstName: string;
  lastName: string;
  birthdate: BirthdateParts;
};

const MONTH_KEYS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const;

export const useOnboardingForm = (profile: ProfileState) => {
  const { t } = useTranslation();
  const form = useForm<OnboardingInputs>({
    mode: 'onChange',
    defaultValues: {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      birthdate: {
        year: parseBirthdatePart(profile.birthdate || '', 0),
        month: parseBirthdatePart(profile.birthdate || '', 1),
        day: parseBirthdatePart(profile.birthdate || '', 2),
      },
    },
  });
  const birthdate = form.watch('birthdate');
  const date = getBirthdateObject(birthdate);
  const age = date ? getValidatedAge(date) : null;
  const currentYear = new Date().getFullYear();

  return {
    ...form,
    age,
    zodiac: date && age !== null ? getZodiacFromDate(date) : null,
    dayOptions: Array.from(
      { length: getDaysInMonth(birthdate.year, birthdate.month) },
      (_, index) => ({ label: String(index + 1), value: index + 1 }),
    ),
    monthOptions: MONTH_KEYS.map((key, index) => ({
      label: t(key),
      value: index + 1,
    })),
    yearOptions: Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
      label: String(currentYear - index),
      value: currentYear - index,
    })),
    firstNameRules: {
      validate: (value: string) =>
        value.trim().length > 0 || t('firstNameRequired'),
    },
    lastNameRules: {
      validate: (value: string) =>
        value.trim().length > 0 || t('lastNameRequired'),
    },
    birthdateRules: {
      validate: (value: BirthdateParts) => {
        if (!value.year || !value.month || !value.day) {
          return t('birthdateRequired');
        }
        const parsed = getBirthdateObject(value);
        if (!parsed) {
          return t('birthdateInvalid');
        }
        return getValidatedAge(parsed) !== null || t('birthdateFuture');
      },
    },
  };
};
