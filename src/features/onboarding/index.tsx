import { SubmitHandler, Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dropdown,
  Header,
  MainLayout,
  Text,
  TextInput,
} from '@common/components';
import { RootStackParamList } from '@common/types.ts';
import { useAppDispatch, useAppSelector } from '@store';
import { setProfile } from '@store/slices/profileSlice';
import { updateBirthdatePart } from '@common/utils/date';
import { styles } from './styles';
import { appImages } from '@assets/images';
import { Storage, StorageKeys } from '@common/storage';
import { OnboardingInputs, useOnboardingForm } from './hooks/useOnboardingForm';
import { getOnboardingImageGeometry } from './utils/imageGeometry';

const backgroundImageSize = Image.resolveAssetSource(appImages.createProfile);
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
    control,
    formState: { isValid },
    age,
    zodiac,
    dayOptions,
    monthOptions,
    yearOptions,
    firstNameRules,
    lastNameRules,
    birthdateRules,
  } = useOnboardingForm(profile);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const { renderedWidth, renderedHeight, croppedTop, croppedLeft, formTop } =
    getOnboardingImageGeometry(backgroundImageSize, viewportSize);

  useEffect(() => {
    Storage.setBoolean(StorageKeys.IS_FIRST_LAUNCH_DONE, true);
  }, []);

  const onSubmit: SubmitHandler<OnboardingInputs> = data => {
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
          rules={firstNameRules}
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
          rules={lastNameRules}
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
          rules={birthdateRules}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
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
                      onSelect={day =>
                        onChange(updateBirthdatePart(value, 'day', day))
                      }
                    />
                  </View>
                  <View style={styles.dateMonth}>
                    <Dropdown
                      placeholder={t('month')}
                      options={monthOptions}
                      value={value.month}
                      onSelect={month =>
                        onChange(updateBirthdatePart(value, 'month', month))
                      }
                    />
                  </View>
                  <View style={styles.dateYear}>
                    <Dropdown
                      placeholder={t('year')}
                      options={yearOptions}
                      value={value.year}
                      onSelect={year =>
                        onChange(updateBirthdatePart(value, 'year', year))
                      }
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
