import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
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

type Birthdate = {
  year?: number;
  month?: number;
  day?: number;
};

type Inputs = {
  firstName: string;
  lastName: string;
  birthdate: Birthdate;
};

const getBirthdateObject = ({ year, month, day }: Birthdate) => {
  if (
    !year ||
    !month ||
    !day ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > getDaysInMonth(year, month)
  ) {
    return undefined;
  }

  return new Date(year, month - 1, day);
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
  const { params } = useRoute<RouteProp<RootStackParamList, 'Onboarding'>>();
  const isEditing = params?.isEditing ?? false;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile);

  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid },
  } = useForm<Inputs>({
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
  const birthdate = watch('birthdate');
  const { year: birthYear, month: birthMonth } = birthdate;
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const currentYear = new Date().getFullYear();

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

  const birthdateObject = getBirthdateObject(birthdate);
  const age = birthdateObject ? getAge(birthdateObject) : null;
  const zodiac =
    birthdateObject && age !== null ? getZodiacFromDate(birthdateObject) : null;

  useEffect(() => {
    Storage.setBoolean(StorageKeys.IS_FIRST_LAUNCH_DONE, true);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(
      setProfile({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        birthdate: [
          data.birthdate.year,
          String(data.birthdate.month).padStart(2, '0'),
          String(data.birthdate.day).padStart(2, '0'),
        ].join('-'),
      }),
    );

    if (isEditing) {
      navigation.goBack();
    } else {
      navigation.replace('MainTabs');
    }
  };

  return (
    <MainLayout
      keyboardAvoiding
      style={styles.layout}
      contentContainerStyle={styles.content}
      statusBarTranslucent
    >
      <ScrollView
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout;
          setViewportSize({ width, height });
        }}
        contentContainerStyle={styles.formCard(formTop)}
      >
        <Image
          source={appImages.createProfile}
          style={styles.backgroundImage(
            croppedTop,
            croppedLeft,
            renderedWidth,
            renderedHeight,
          )}
        />

        <Text variant='heading2'>
          {t(isEditing ? 'editProfile' : 'createYourProfile')}
        </Text>
        <Text variant='body' color='textSecondary'>
          {t(isEditing ? 'editProfileDescription' : 'createProfileDescription')}
        </Text>

        <Controller
          control={control}
          rules={{
            validate: value =>
              value.trim().length > 0 || t('firstNameRequired'),
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder={t('enterYourFirstName')}
              onBlur={onBlur}
              onValueChange={onChange}
              value={value}
              errorMessage={error?.message}
              required
            />
          )}
          name='firstName'
        />

        <Controller
          control={control}
          rules={{
            validate: value => value.trim().length > 0 || t('lastNameRequired'),
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder={t('enterYourLastName')}
              onBlur={onBlur}
              onValueChange={onChange}
              value={value}
              errorMessage={error?.message}
              required
            />
          )}
          name='lastName'
        />

        <Controller
          control={control}
          name='birthdate'
          rules={{
            validate: value => {
              if (!value.year || !value.month || !value.day) {
                return t('birthdateRequired');
              }
              const date = getBirthdateObject(value);
              if (!date) {
                return t('birthdateInvalid');
              }
              return getAge(date) !== null || t('birthdateFuture');
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            const selectPart = (part: keyof Birthdate, selected: number) => {
              const nextBirthdate = { ...value, [part]: selected };
              if (
                nextBirthdate.day &&
                nextBirthdate.day >
                  getDaysInMonth(nextBirthdate.year, nextBirthdate.month)
              ) {
                nextBirthdate.day = undefined;
              }
              onChange(nextBirthdate);
            };

            return (
              <View style={styles.birthdateSection}>
                <Text variant='label' color='textGold'>
                  {t('birthdate')}
                </Text>
                <View style={styles.dateRow}>
                  <View style={styles.dateDay}>
                    <Dropdown
                      placeholder={t('day')}
                      options={dayOptions}
                      value={value.day}
                      onSelect={day => selectPart('day', day)}
                    />
                  </View>
                  <View style={styles.dateMonth}>
                    <Dropdown
                      placeholder={t('month')}
                      options={monthOptions}
                      value={value.month}
                      onSelect={month => selectPart('month', month)}
                    />
                  </View>
                  <View style={styles.dateYear}>
                    <Dropdown
                      placeholder={t('year')}
                      options={yearOptions}
                      value={value.year}
                      onSelect={year => selectPart('year', year)}
                    />
                  </View>
                </View>
                {error?.message ? (
                  <Text variant='caption' color='error'>
                    {error.message}
                  </Text>
                ) : null}
              </View>
            );
          }}
        />

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
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
          disabled={!isValid}
        >
          {t(isEditing ? 'saveProfile' : 'startNow')}
        </Button>
        {isEditing && (
          <Button
            variant='outline'
            onPress={() => navigation.goBack()}
            style={styles.submitButton}
          >
            {t('goBack')}
          </Button>
        )}
      </ScrollView>
    </MainLayout>
  );
};
