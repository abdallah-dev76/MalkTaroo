import { useRef } from 'react';
import { Image, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { Header, MainLayout, Text } from '@common/components';
import { RootStackParamList } from '@common/types.ts';
import {
  getPeriodMeaningKey,
  getTarotCard,
  TAROT_PERIODS,
} from '@common/data/tarot';
import { shareResultView } from '@features/compatibility/components/ResultView';
import { useAppSelector } from '@store';
import { readingTypeKey } from './index';
import { styles } from './styles';

export const TarotDetail = () => {
  const { theme } = useUnistyles();
  const { t, i18n } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id } =
    useRoute<RouteProp<RootStackParamList, 'TarotDetail'>>().params;
  const reading = useAppSelector(state =>
    state.tarot.history.find(item => item.id === id),
  );
  const cards = (reading?.cardIds ?? []).map(getTarotCard);
  const card = cards[0] ?? getTarotCard();
  const isThree = reading?.type === 'three';
  const shareText = isThree
    ? TAROT_PERIODS.map(
        (period, index) =>
          `${t(period)}: ${t(
            getPeriodMeaningKey(cards[index] ?? card, period),
          )}`,
      ).join('\n')
    : t(card.meaningKey);
  const imageRef = useRef<View>(null);

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      contentContainerStyle={styles.detail}
      header={
        <Header>
          <Header.Icon
            name='rightArrow'
            color={theme.iconPrimary}
            onPress={() => navigation.goBack()}
          />
          <Header.Title>{t('tarot')}</Header.Title>
          {reading && (
            <Header.Icon
              name='share'
              color={theme.iconPrimary}
              onPress={() => shareResultView(imageRef, shareText)}
            />
          )}
        </Header>
      }
    >
      {reading ? (
        <View ref={imageRef} collapsable={false} style={styles.detailContent}>
          {!isThree && (
            <Image
              source={card.image}
              style={styles.detailCard}
              resizeMode='cover'
            />
          )}
          <Text variant='heading3' color='textGold' textAlign='center'>
            {t(readingTypeKey(reading.type))}
          </Text>
          <Text variant='caption' color='textSecondary' textAlign='center'>
            {new Date(reading.createdAt).toLocaleDateString(i18n.language, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          {isThree ? (
            <View style={styles.periodRow}>
              {TAROT_PERIODS.map((period, index) => {
                const periodCard = cards[index] ?? card;
                return (
                  <View key={period} style={styles.periodColumn}>
                    <Image
                      source={periodCard.image}
                      style={styles.periodCard}
                      resizeMode='cover'
                    />
                    <Text variant='label' color='textGold' textAlign='center'>
                      {t(period)}
                    </Text>
                    <View style={styles.periodReading}>
                      <Text variant='caption' textAlign='center'>
                        {t(getPeriodMeaningKey(periodCard, period))}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.resultBox}>
              <Text variant='body' textAlign='center'>
                {t(card.meaningKey)}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <Text variant='body' color='textSecondary' textAlign='center'>
          {t('noTarotReadingHistory')}
        </Text>
      )}
    </MainLayout>
  );
};
