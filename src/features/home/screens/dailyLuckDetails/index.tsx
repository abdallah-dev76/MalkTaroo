import { View, useWindowDimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { Header, Icon, MainLayout, Text } from '@common/components';
import type { RootStackParamList } from '@common/types.ts';
import { getArrowDirection } from '@common/utils/getArrowDirection';
import { useDailyClock } from '../../hooks/useDailyClock';
import { getDailyLuckScore, luckCategories } from '../home/data';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyLuckDetails'>;

const sections = [
  { category: luckCategories[0] },
  { category: luckCategories[2] },
  { category: luckCategories[1] },
  { category: luckCategories[3] },
];

export const DailyLuckDetails = ({ navigation }: Props) => {
  const { t, i18n } = useTranslation();
  const { theme } = useUnistyles();
  const { width } = useWindowDimensions();
  const now = useDailyClock();
  const date = new Intl.DateTimeFormat(i18n.resolvedLanguage ?? i18n.language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    numberingSystem: 'latn',
  }).format(now);

  return (
    <MainLayout
      scrollable
      header={
        <Header>
          <Header.Icon
            name={getArrowDirection('rightArrow')}
            color={theme.iconPrimary}
            onPress={() => navigation.goBack()}
          />
          <Header.Title>{t('luckOfTheDay')}</Header.Title>
        </Header>
      }
      contentContainerStyle={styles.container}
    >
      <View style={styles.heading}>
        <View style={styles.headingTitle}>
          <Icon name='star' size={24} color={theme.textGold} />
          <Text variant='heading3' color='textGold' style={styles.title}>
            {t('dailyLuck.title')}
          </Text>
        </View>
        <Text variant='caption' color='textSecondary'>
          {date}
        </Text>
      </View>
      <View style={styles.grid}>
        {sections.map(({ category }) => {
          const score = getDailyLuckScore(category.id, now);
          const level = score >= 7 ? 'high' : score >= 4 ? 'balanced' : 'low';

          return (
            <View
              key={category.id}
              style={[styles.card, width >= 700 && styles.wideCard]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeading}>
                  <Icon
                    name={category.icon}
                    size={22}
                    color={theme[category.color]}
                  />
                  <Text
                    variant='bodyMedium'
                    color='textGold'
                    style={styles.title}
                  >
                    {t(`dailyLuck.categories.${category.titleKey}`)}
                  </Text>
                </View>
                <View style={styles.scoreRow}>
                  <Text variant='caption' color={category.color}>
                    {t('dailyLuck.score', { score })}
                  </Text>
                  <Text variant='caption' color='textSecondary'>
                    {t(`dailyLuck.levels.${level}`)}
                  </Text>
                </View>
                <View
                  accessible
                  accessibilityLabel={t('dailyLuck.score', { score })}
                  style={styles.track}
                >
                  <View style={styles.progress(score, category.color)} />
                </View>
                <Text
                  variant='label'
                  color='textSecondary'
                  style={styles.message}
                >
                  {t(`dailyLuck.messages.${category.titleKey}.${level}`)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <Text variant='caption' color='textSecondary' textAlign='center'>
        {t('dailyLuck.note')}
      </Text>
    </MainLayout>
  );
};
