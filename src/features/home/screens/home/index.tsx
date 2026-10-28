import { useCallback, useEffect, useMemo, useRef } from 'react';
import { MainLayout, Text, Header, Button } from '@common/components';
import {
  View,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
  AccessibilityInfo,
  Animated,
  Easing,
} from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { appImages } from '@assets/images';
import { SECTION_ICON_SIZE, styles } from './styles';
import { TarotCard } from '../../components/tarotCard';
import { ZodiacCard } from '../../components/zodiacCard';
import { zodiacList } from '@common/data/zodiac';
import { tarotCards } from '@common/data/tarot';
import { useAppSelector } from '@store';
import { getZodiacFromDate } from '@common/utils';
import { LuckCard } from '@features/home/components/luckCard';
import { getDailyLuckScore, luckCategories } from './data';
import { parseBirthdate } from '@common/utils/date';
import { useDailyClock } from '../../hooks/useDailyClock';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@common/types.ts';
import { getArrowDirection } from '@common/utils/getArrowDirection';

const getTarotCardKey = (item: (typeof tarotCards)[number]) => item.id;
const getZodiacCardKey = (item: (typeof zodiacList)[number]) => item.id;
const tarotPreview = tarotCards.slice(0, 4);
const zodiacPreview = zodiacList.slice(0, 4);

export const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useUnistyles();
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();
  const firstName = useAppSelector(state => state.profile.firstName);
  const profileBirthdate = useAppSelector(state => state.profile.birthdate);
  const now = useDailyClock();
  const useCompactLuckLayout = width < 390;

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
          id={item.id}
          image={item.image}
          title={item.nameEn}
          cardLabel={item.nameAr}
          description={t(item.shortDescription)}
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
          id={item.id}
        />
      ),
      [t],
    );

  const dailyMessageImage = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    let disposed = false;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(dailyMessageImage, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(dailyMessageImage, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          isInteraction: false,
        }),
      ]),
      { resetBeforeIteration: false },
    );
    const updateMotion = (reduceMotion: boolean) => {
      if (disposed) {
        return;
      }
      animation.stop();
      animation.reset();
      dailyMessageImage.setValue(0.5);
      if (!reduceMotion) {
        animation.start();
      }
    };
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      updateMotion,
    );
    AccessibilityInfo.isReduceMotionEnabled()
      .then(updateMotion)
      .catch(() => updateMotion(true));

    return () => {
      disposed = true;
      subscription.remove();
      animation.stop();
    };
  }, [dailyMessageImage]);

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
        <View style={styles.dailyMessage}>
          <View style={styles.dailyText}>
            <View>
              <Text color='textGold' style={styles.bold}>
                {t('dailyMessage')}
              </Text>
              <Text variant='caption' color='textSecondary'>
                {formattedDate}
              </Text>
            </View>
            <Text variant='label'>{t('randomText')}</Text>
          </View>
          <Animated.View
            style={[
              styles.imageContainer,
              {
                transform: [
                  {
                    translateY: dailyMessageImage.interpolate({
                      inputRange: [0, 1],
                      outputRange: [12, -12],
                    }),
                  },
                  {
                    scale: dailyMessageImage.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.97, 1.07],
                    }),
                  },
                  {
                    rotate: dailyMessageImage.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-2deg', '2deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Animated.Image
              source={appImages.magicBall}
              resizeMode='contain'
              blurRadius={12}
              accessible={false}
              style={[
                styles.magicBallGlow,
                {
                  opacity: dailyMessageImage.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.15, 0.55],
                  }),
                },
              ]}
            />
            <Animated.Image
              source={appImages.magicBall}
              resizeMode='contain'
              style={styles.magicBallImage}
            />
          </Animated.View>
        </View>
      </View>

      {/* Luck of the day */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text>{t('luckOfTheDay')}</Text>
          <Button
            variant='ghost'
            size='small'
            onPress={() => navigation.navigate('DailyLuckDetails')}
            rightIcon={{
              name: getArrowDirection('leftArrow'),
              size: SECTION_ICON_SIZE,
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
            onPress={() =>
              navigation.navigate('LearningList', { type: 'tarot' })
            }
            rightIcon={{
              name: getArrowDirection('leftArrow'),
              size: SECTION_ICON_SIZE,
              color: theme.textGold,
            }}
          >
            {t('showMore')}
          </Button>
        </View>
        <FlatList
          data={tarotPreview}
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
            onPress={() =>
              navigation.navigate('LearningList', { type: 'zodiac' })
            }
            rightIcon={{
              name: getArrowDirection('leftArrow'),
              size: SECTION_ICON_SIZE,
              color: theme.textGold,
            }}
          >
            {t('showMore')}
          </Button>
        </View>
        <FlatList
          data={zodiacPreview}
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
