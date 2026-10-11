import { Pressable, Switch, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@common/types.ts';

import { useTranslation } from 'react-i18next';
import { Button, Header, Icon, MainLayout, Text } from '@common/components';
import { toggleLanguage, toggleTheme } from '@common/utils';
import { getZodiacFromDate } from '@common/utils/zodiac';
import { useAppSelector } from '@store';
import { styles } from './styles';
import Avatar from '@common/components/Avatar';
import { appImages } from '@assets/images';

const LANGUAGES = [
  { code: 'en', labelKey: 'english' },
  { code: 'ar', labelKey: 'arabic' },
] as const;

const getAge = (birthdate: Date) => {
  const today = new Date();
  const hadBirthday =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() >= birthdate.getDate());
  return today.getFullYear() - birthdate.getFullYear() - (hadBirthday ? 0 : 1);
};

export const Profile = () => {
  const { theme, rt } = useUnistyles();
  const { t, i18n } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isDailyMessageEnabled, setIsDailyMessageEnabled] = useState(false);
  const toggleDailyMessage = () => {
    setIsDailyMessageEnabled(prev => !prev);
  };
  const profile = useAppSelector(state => state.profile);
  const fullName = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();
  const birthdate = profile.birthdate
    ? new Date(`${profile.birthdate}T00:00:00`)
    : undefined;
  const age =
    birthdate && !Number.isNaN(birthdate.getTime())
      ? getAge(birthdate)
      : undefined;
  const zodiac =
    birthdate && !Number.isNaN(birthdate.getTime())
      ? getZodiacFromDate(birthdate)
      : undefined;
  const displayName = fullName || 'Malak';

  const isDarkTheme = rt.themeName === 'dark';

  const handleLanguagePress = (code: string) => {
    if (code !== i18n.language) {
      toggleLanguage();
    }
  };

  return (
    <MainLayout
      scrollable
      edges={['right', 'left', 'top']}
      style={styles.layout}
      contentContainerStyle={styles.content}
      header={
        <Header>
          <Header.Title>{t('profile')}</Header.Title>
        </Header>
      }
    >
      <View style={styles.profileData}>
        <Avatar
          source={appImages[zodiac as keyof typeof appImages]}
          isBorder
          size='large'
        />
        <Text variant='heading1' textAlign='center' numberOfLines={1}>
          {displayName}
        </Text>
        <Button
          variant='outline'
          size='small'
          onPress={() => navigation.navigate('Onboarding', { isEditing: true })}
        >
          {t('editProfile')}
        </Button>
      </View>

      <View style={styles.body}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.iconCircle}>
              <Icon name='astrology' size={24} color={theme.textGold} />
            </View>
            <Text variant='label' textAlign='center' numberOfLines={1}>
              {zodiac ? t(zodiac) : '-'}
            </Text>
            <Text variant='small' color='textSecondary' textAlign='center'>
              {t('yourZodiac')}
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.iconCircle}>
              <Icon name='calender' size={24} color={theme.textGold} />
            </View>
            <Text variant='label' textAlign='center' numberOfLines={1}>
              {birthdate
                ? birthdate.toLocaleDateString(i18n.language, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '-'}
            </Text>
            <Text variant='small' color='textSecondary' textAlign='center'>
              {t('birthdate')}
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.iconCircle}>
              <Icon name='profile' size={24} color={theme.textGold} />
            </View>
            <Text variant='label' textAlign='center'>
              {age ?? '-'}
            </Text>
            <Text variant='small' color='textSecondary' textAlign='center'>
              {t('age')}
            </Text>
          </View>
        </View>

        <Text variant='heading3'>{t('settings')}</Text>

        <View style={styles.section}>
          {/* Readings */}
          <Pressable
            style={styles.settingRow}
            onPress={() => navigation.navigate('TarotHistory')}
          >
            <View style={styles.iconCircle}>
              <Icon name='cards' size={24} color={theme.textGold} />
            </View>
            <View style={styles.settingText}>
              <Text variant='label'>{t('myReadings')}</Text>
              <Text variant='caption' color='textSecondary'>
                {t('viewYourSavedTarotReadings')}
              </Text>
            </View>

            <Icon name='leftArrow' size={24} color={theme.textGold} />
          </Pressable>

          <View style={styles.divider} />

          {/* Language */}
          <View style={styles.settingRow}>
            <View style={styles.iconCircle}>
              <Icon name='lang' size={24} color={theme.textGold} />
            </View>
            <View style={styles.settingText}>
              <Text variant='label'>{t('language')}</Text>
              <Text variant='caption' color='textSecondary'>
                {t('languageDescription')}
              </Text>
            </View>
            <View style={styles.segment}>
              {LANGUAGES.map(lang => {
                const active = i18n.language === lang.code;
                return (
                  <Pressable
                    key={lang.code}
                    onPress={() => handleLanguagePress(lang.code)}
                    style={styles.segmentItem(active)}
                  >
                    <Text
                      variant='caption'
                      color={active ? 'buttonPrimaryText' : 'textSecondary'}
                      textAlign='center'
                    >
                      {t(lang.labelKey)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Theme */}
          <View style={styles.settingRow}>
            <View style={styles.iconCircle}>
              <Icon name='moon' size={24} color={theme.textGold} />
            </View>
            <View style={styles.settingText}>
              <Text variant='label'>{t('darkMode')}</Text>
              <Text variant='caption' color='textSecondary'>
                {t('darkModeDescription')}
              </Text>
            </View>
            <Switch
              value={isDarkTheme}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.textPrimary}
              ios_backgroundColor={theme.border}
            />
          </View>

          <View style={styles.divider} />

          {/* Daily Message Notification */}
          <View style={styles.settingRow}>
            <View style={styles.iconCircle}>
              <Icon name='notification' size={24} color={theme.textGold} />
            </View>
            <View style={styles.settingText}>
              <Text variant='label'>{t('dailyMessageNotification')}</Text>
              <Text variant='caption' color='textSecondary'>
                {t('dailyMessageDescription')}
              </Text>
            </View>
            <Switch
              value={isDailyMessageEnabled}
              onValueChange={toggleDailyMessage}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.textPrimary}
              ios_backgroundColor={theme.border}
            />
          </View>
        </View>
      </View>
    </MainLayout>
  );
};
