import { Pressable, Switch, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@common/types.ts';

import { useTranslation } from 'react-i18next';
import { Header, Icon, MainLayout, Text } from '@common/components';
import { Storage, StorageKeys } from '@common/storage';
import { toggleLanguage, toggleTheme } from '@common/utils';
import { styles } from './styles';

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
  const name = Storage.getString(StorageKeys.UserName) ?? 'Malak';
  const storedBirthdate = Storage.getString(StorageKeys.UserBirthdate);
  const birthdate = storedBirthdate ? new Date(storedBirthdate) : undefined;
  const age = birthdate ? getAge(birthdate) : undefined;

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
      <View>
        <Text variant='display' textAlign='center' numberOfLines={1}>
          {name}
        </Text>
      </View>

      <View style={styles.body}>
        <Text variant='heading3'>{t('yourDetails')}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.iconCircle}>
              <Icon name='cards' size={20} color={theme.iconActive} />
            </View>
            <Text variant='label' textAlign='center' numberOfLines={1}>
              -
            </Text>
            <Text variant='small' color='textSecondary' textAlign='center'>
              {t('yourZodiac')}
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.iconCircle}>
              <Icon name='cards' size={20} color={theme.iconActive} />
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
              <Icon name='profile' size={20} color={theme.iconActive} />
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
              <Text variant='label' color='textGold'>
                Aa
              </Text>
            </View>
            <View style={styles.settingText}>
              <Text variant='label'>{t('myReadings')}</Text>
              <Text variant='caption' color='textSecondary'>
                {t('viewYourSavedTarotReadings')}
              </Text>
            </View>

            <Icon name='leftArrow' size={20} color={theme.iconActive} />
          </Pressable>

          <View style={styles.divider} />

          {/* Compatibility */}
          <Pressable
            style={styles.settingRow}
            onPress={() => navigation.navigate('CompatibilityHistory')}
          >
            <View style={styles.iconCircle}>
              <Text variant='label' color='textGold'>
                Aa
              </Text>
            </View>
            <View style={styles.settingText}>
              <Text variant='label'>{t('myCompatibility')}</Text>
              <Text variant='caption' color='textSecondary'>
                {t('peopleYouHaveChecked')}
              </Text>
            </View>

            <Icon name='leftArrow' size={20} color={theme.iconActive} />
          </Pressable>

          <View style={styles.divider} />

          {/* Language */}
          <View style={styles.settingRow}>
            <View style={styles.iconCircle}>
              <Text variant='label' color='textGold'>
                Aa
              </Text>
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

          <View style={styles.settingRow}>
            <View style={styles.iconCircle}>
              <Icon name='cards' size={20} color={theme.iconActive} />
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

          <View style={styles.settingRow}>
            <View style={styles.iconCircle}>
              <Icon name='cards' size={20} color={theme.iconActive} />
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
