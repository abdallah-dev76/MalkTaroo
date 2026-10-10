import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dropdown,
  MainLayout,
  Text,
  TextInput,
} from '@common/components';
import { RootStackParamList } from '@common/types.ts';
import { useAppDispatch, useAppSelector } from '@store';
import { setProfile } from '@store/slices/profileSlice';
import { getZodiacFromDate } from '@common/utils/zodiac';
import { styles } from './styles';
import { appImages } from '@assets/images';
import { spacing } from '@theme/spacing';
import { Storage, StorageKeys } from '@common/storage';

const backgroundImageSize = Image.resolveAssetSource(appImages.createProfile);
const formStartRatio = 0.3;
const MIN_BIRTH_YEAR = 1900;
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

const getDaysInMonth = (year?: number, month?: number) =>
  month ? new Date(year ?? 2000, month, 0).getDate() : 31;

const parseBirthdatePart = (birthdate: string, index: number) => {
  const part = Number(birthdate.split('-')[index]);
  return Number.isInteger(part) && part > 0 ? part : undefined;
};

const getAge = (birthdate: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(birthdate.getTime()) || birthdate > today) {
    return null;
  }

  const hadBirthday =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() >= birthdate.getDate());

  return today.getFullYear() - birthdate.getFullYear() - (hadBirthday ? 0 : 1);
};

export const Onboarding = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile);

  const [firstName, setFirstName] = useState(profile.firstName || '');
  const [lastName, setLastName] = useState(profile.lastName || '');
  const [birthYear, setBirthYear] = useState(() =>
    parseBirthdatePart(profile.birthdate || '', 0),
  );
  const [birthMonth, setBirthMonth] = useState(() =>
    parseBirthdatePart(profile.birthdate || '', 1),
  );
  const [birthDay, setBirthDay] = useState(() =>
    parseBirthdatePart(profile.birthdate || '', 2),
  );
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const currentYear = new Date().getFullYear();

  const birthdate =
    birthYear && birthMonth && birthDay
      ? [
          birthYear,
          String(birthMonth).padStart(2, '0'),
          String(birthDay).padStart(2, '0'),
        ].join('-')
      : '';

  const dayOptions = Array.from(
    { length: getDaysInMonth(birthYear, birthMonth) },
    (_, index) => ({ label: String(index + 1), value: index + 1 }),
  );
  const monthOptions = MONTH_KEYS.map((key, index) => ({
    label: t(key),
    value: index + 1,
  }));
  const yearOptions = Array.from(
    { length: currentYear - MIN_BIRTH_YEAR + 1 },
    (_, index) => ({
      label: String(currentYear - index),
      value: currentYear - index,
    }),
  );

  // Sized like `cover` against the visible viewport, then scrolls with the content.
  const imageScale = Math.max(
    viewportSize.width / backgroundImageSize.width,
    viewportSize.height / backgroundImageSize.height,
  );
  const renderedWidth = backgroundImageSize.width * imageScale;
  const renderedHeight = backgroundImageSize.height * imageScale;
  const croppedTop = (renderedHeight - viewportSize.height) / 2;
  const croppedLeft = (renderedWidth - viewportSize.width) / 2;
  const formTop = Math.max(0, renderedHeight * formStartRatio - croppedTop);

  const birthdateObject = useMemo(() => {
    if (!birthdate) {
      return undefined;
    }

    const parsed = new Date(`${birthdate}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }, [birthdate]);

  const age = birthdateObject ? getAge(birthdateObject) : null;
  const zodiac =
    birthdateObject && age !== null ? getZodiacFromDate(birthdateObject) : null;

  const isValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    birthdate.length > 0 &&
    age !== null;

  const clearInvalidDay = (year?: number, month?: number) => {
    if (birthDay && birthDay > getDaysInMonth(year, month)) {
      setBirthDay(undefined);
    }
  };

  const handleMonthSelect = (month: number) => {
    setBirthMonth(month);
    clearInvalidDay(birthYear, month);
  };

  const handleYearSelect = (year: number) => {
    setBirthYear(year);
    clearInvalidDay(year, birthMonth);
  };

  const handleContinue = () => {
    if (!isValid) {
      return;
    }

    dispatch(
      setProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthdate,
      }),
    );

    navigation.replace('MainTabs');
  };

  useEffect(() => {
    Storage.setBoolean(StorageKeys.IS_FIRST_LAUNCH_DONE, true);
  }, []);

  return (
    <MainLayout
      keyboardAvoiding
      style={styles.layout}
      contentContainerStyle={styles.content}
      statusBarTranslucent
      edges={['top', 'right', 'left']}
    >
      <ScrollView
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout;
          setViewportSize({ width, height });
        }}
        contentContainerStyle={[
          styles.formCard,
          { paddingTop: formTop + spacing.md },
        ]}
      >
        <Image
          source={appImages.createProfile}
          style={[
            styles.backgroundImage,
            {
              top: -croppedTop,
              left: -croppedLeft,
              width: renderedWidth,
              height: renderedHeight,
            },
          ]}
        />

        <Text variant='heading2'>{t('createYourProfile')}</Text>
        <Text variant='body' color='textSecondary'>
          {t('createProfileDescription')}
        </Text>

        <TextInput
          label={t('firstName')}
          placeholder={t('enterYourFirstName')}
          value={firstName}
          onValueChange={setFirstName}
          iconName='profile'
        />

        <TextInput
          label={t('lastName')}
          placeholder={t('enterYourLastName')}
          value={lastName}
          onValueChange={setLastName}
          iconName='profile'
        />

        <View style={styles.birthdateSection}>
          <Text variant='label' color='textGold'>
            {t('birthdate')}
          </Text>
          <View style={styles.dateRow}>
            <View style={styles.dateDay}>
              <Dropdown
                placeholder={t('day')}
                options={dayOptions}
                value={birthDay}
                onSelect={setBirthDay}
              />
            </View>
            <View style={styles.dateMonth}>
              <Dropdown
                placeholder={t('month')}
                options={monthOptions}
                value={birthMonth}
                onSelect={handleMonthSelect}
              />
            </View>
            <View style={styles.dateYear}>
              <Dropdown
                placeholder={t('year')}
                options={yearOptions}
                value={birthYear}
                onSelect={handleYearSelect}
              />
            </View>
          </View>
        </View>

        {(zodiac || age !== null) && (
          <View style={styles.previewCard}>
            {zodiac ? (
              <Text variant='label'>
                {t('yourZodiac')}: {t(zodiac)}
              </Text>
            ) : null}
            {age !== null ? (
              <Text variant='label'>
                {t('age')}: {age}
              </Text>
            ) : null}
          </View>
        )}

        <Button
          variant='primary'
          onPress={handleContinue}
          disabled={!isValid}
          style={styles.submitButton}
        >
          {t('startNow')}
        </Button>
      </ScrollView>
    </MainLayout>
  );
};
