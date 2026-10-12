import { Button, Text, MainLayout, Header } from '@common/components';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useUnistyles } from 'react-native-unistyles';
import { Animated, View } from 'react-native';
import { appImages } from '@assets/images';
import {
  drawTarotCards,
  getPeriodMeaningKey,
  getTarotCard,
  TAROT_PERIODS,
} from '@common/data/tarot';
import { addTarotReading, useAppDispatch } from '@store';
import { getCardAnimationStyle, getOpacityStyle, styles } from './styles';

export const ThreeCardReading = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useUnistyles();
  const dispatch = useAppDispatch();
  const [cardIds, setCardIds] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const flipProgress = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;

  const handleRevealCards = () => {
    if (isAnimating || isRevealed) {
      return;
    }

    const ids = drawTarotCards(TAROT_PERIODS.length).map(card => card.id);
    setCardIds(ids);
    dispatch(addTarotReading({ type: 'three', cardIds: ids }));
    setIsAnimating(true);

    Animated.parallel([
      Animated.timing(flipProgress, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsRevealed(true);

      Animated.timing(flipProgress, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(resultOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }).start(() => setIsAnimating(false));
      });
    });
  };

  const handleTryAnotherReading = () => {
    if (isAnimating || !isRevealed) {
      return;
    }

    setIsAnimating(true);

    Animated.parallel([
      Animated.timing(flipProgress, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(resultOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsRevealed(false);

      Animated.parallel([
        Animated.timing(flipProgress, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => setIsAnimating(false));
    });
  };

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      header={
        <Header>
          <Header.Icon
            name='rightArrow'
            color={theme.iconPrimary}
            onPress={() => navigation.goBack()}
          />
        </Header>
      }
    >
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text variant='heading1' color={theme.textGold} textAlign='center'>
            {t('threeCardHeading')}
          </Text>
          <Text variant='body' textAlign='center'>
            {t('threeCardHeadingDescription')}
          </Text>
        </View>

        <View style={styles.cards}>
          {TAROT_PERIODS.map((period, index) => {
            const card = getTarotCard(cardIds[index]);
            return (
              <View key={period} style={styles.cardColumn}>
                <Animated.Image
                  source={isRevealed ? card.image : appImages.tarotCard}
                  style={[
                    styles.tarotCard,
                    getCardAnimationStyle(flipProgress),
                  ]}
                  resizeMode='contain'
                />
                <Text variant='label' color={theme.textGold} textAlign='center'>
                  {t(period)}
                </Text>
                {isRevealed && (
                  <Animated.View
                    style={[styles.cardReading, getOpacityStyle(resultOpacity)]}
                  >
                    <Text
                      variant='caption'
                      color={theme.textPrimary}
                      textAlign='center'
                    >
                      {t(getPeriodMeaningKey(card, period))}
                    </Text>
                  </Animated.View>
                )}
              </View>
            );
          })}
        </View>

        <View
          pointerEvents={isAnimating ? 'none' : 'auto'}
          style={styles.buttonWrapper}
        >
          {isRevealed ? (
            <Animated.View
              style={[styles.resultContent, getOpacityStyle(resultOpacity)]}
            >
              <Button
                variant='outline'
                fullWidth
                onPress={handleTryAnotherReading}
              >
                {t('tryAnotherReading')}
              </Button>
              <Button variant='premium' fullWidth onPress={() => {}}>
                {t('share')}
              </Button>
            </Animated.View>
          ) : (
            <Animated.View style={getOpacityStyle(buttonOpacity)}>
              <Button
                variant='premium'
                fullWidth
                disabled={isAnimating}
                onPress={handleRevealCards}
              >
                {t('revealCards')}
              </Button>
            </Animated.View>
          )}
        </View>
      </View>
    </MainLayout>
  );
};
