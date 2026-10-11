import { useCallback, useEffect, useMemo, useState } from 'react';
import { MainLayout, Text, Header, Button } from '@common/components';
import {
  View,
  ImageBackground,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { appImages } from '@assets/images';
import { styles } from './styles';
import { TarotCard } from '../../components/tarotCard';
import { ZodiacCard } from '../../components/zodiacCard';
import { zodiacList } from '@common/data/zodiac';
import { tarotCards } from '@common/data/tarot';
import { useAppSelector } from '@store';
import { getZodiacFromDate } from '@common/utils';
import { LuckCard } from '@features/home/components/luckCard';
import { getDailyLuckScore, luckCategories } from './data';

const getTarotCardKey = (item: (typeof tarotCards)[number]) => item.id;
const getZodiacCardKey = (item: (typeof zodiacList)[number]) => item.id;

const parseBirthdate = (value?: string) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : undefined;
};

export const Home = () => {
  const { theme, rt } = useUnistyles();
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();
  const firstName = useAppSelector(state => state.profile.firstName);
  const profileBirthdate = useAppSelector(state => state.profile.birthdate);
  const [now, setNow] = useState(() => new Date());
  const themeName = rt.themeName;
  const useCompactLuckLayout = width < 390;

  useEffect(() => {
    const nextRefresh = new Date(now);
    if (now.getHours() < 12) {
      nextRefresh.setHours(12, 0, 0, 0);
    } else {
      nextRefresh.setDate(nextRefresh.getDate() + 1);
      nextRefresh.setHours(0, 0, 0, 0);
    }

    const timeoutId = setTimeout(
      () => setNow(new Date()),
      nextRefresh.getTime() - now.getTime(),
    );

    return () => clearTimeout(timeoutId);
  }, [now]);
  const birthdate = parseBirthdate(profileBirthdate);
  const locale = i18n.resolvedLanguage ?? i18n.language;
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        numberingSystem: 'latn',
      }),
    [locale],
  );

  const zodiac =
    birthdate && !Number.isNaN(birthdate.getTime())
      ? getZodiacFromDate(birthdate)
      : undefined;

  const greetingKey = now.getHours() < 12 ? 'goodMorning' : 'goodEvening';
  const formattedDate = dateFormatter
    .formatToParts(now)
    .filter(part => part.type !== 'literal')
    .map(part => part.value)
    .join(' ');

  const renderTarotCard: ListRenderItem<(typeof tarotCards)[number]> =
    useCallback(
      ({ item }) => (
        <TarotCard
          image={item.image}
          title={t(item.name, { lng: 'en' })}
          description={t(item.meaningKey)}
          cardLabel={t(item.name, { lng: 'ar' })}
          learnMoreLabel={t('learnMore')}
        />
      ),
      [t],
    );
  const renderZodiacCard: ListRenderItem<(typeof zodiacList)[number]> =
    useCallback(
      ({ item }) => (
        <ZodiacCard
          image={item.image}
          title={t(item.id)}
          dateRange={t(`dates.${item.id}`)}
        />
      ),
      [t],
    );

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      header={
        <Header style={styles.ph24}>
          <Header.Hello zodiac={zodiac}>
            {t(greetingKey)}
            {firstName ? ` ${firstName}` : ''}!
          </Header.Hello>
          <Header.Icon
            name='notification'
            onPress={() => {}}
            color={theme.iconPrimary}
          />
        </Header>
      }
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Daily Message */}
      <View style={styles.ph24}>
        <ImageBackground
          source={
            themeName === 'light'
              ? appImages.dailyMessageLight
              : appImages.dailyMessage
          }
          resizeMode='cover'
          style={styles.dailyMessage}
        >
          <View
            style={[
              styles.dailyOverlay,
              themeName === 'light' ? styles.lightOverlay : styles.darkOverlay,
            ]}
          />
          <View style={styles.dailyContent}>
            <View style={styles.dailyText}>
              <View>
                <Text>{t('dailyMessage')}</Text>
                <Text variant='caption' color='textSecondary'>
                  {formattedDate}
                </Text>
              </View>
              <Text variant='label' numberOfLines={2}>
                {t('randomText')}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Luck of the day */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text>{t('luckOfTheDay')}</Text>
          <Button
            variant='ghost'
            size='small'
            rightIcon={{
              name: 'leftArrow',
              size: 16,
              color: theme.textGold,
            }}
          >
            {t('knowYourLuckToday')}
          </Button>
        </View>
        <View
          style={[
            styles.luckCardsContainer,
            useCompactLuckLayout && styles.luckCardsContainerCompact,
          ]}
        >
          {luckCategories.map(category => (
            <LuckCard
              key={category.id}
              title={t(category.titleKey)}
              score={getDailyLuckScore(category.id, now)}
              color={category.color}
              icon={category.icon}
              compact={useCompactLuckLayout}
            />
          ))}
        </View>
      </View>

      {/* Learn Tarot */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text>{t('learnTarot')}</Text>
          <Button
            variant='ghost'
            size='small'
            rightIcon={{
              name: 'leftArrow',
              size: 16,
              color: theme.textGold,
            }}
          >
            {t('showMore')}
          </Button>
        </View>
        <FlatList
          data={tarotCards}
          keyExtractor={getTarotCardKey}
          renderItem={renderTarotCard}
          horizontal
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Learn Zodiac */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text>{t('learnZodiac')}</Text>
          <Button
            variant='ghost'
            size='small'
            rightIcon={{
              name: 'leftArrow',
              size: 16,
              color: theme.textGold,
            }}
          >
            {t('showMore')}
          </Button>
        </View>
        <FlatList
          data={zodiacList}
          keyExtractor={getZodiacCardKey}
          renderItem={renderZodiacCard}
          horizontal
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </MainLayout>
  );
};
