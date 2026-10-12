import { Button, Text, MainLayout, Header } from '@common/components';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useUnistyles } from 'react-native-unistyles';
import { Animated, View } from 'react-native';
import { appImages } from '@assets/images';
import { drawTarotCard, getTarotCard } from '@common/data/tarot';
import { addTarotReading, useAppDispatch } from '@store';
import {
  CARD_LIFT_OFFSET,
  getCardAnimationStyle,
  getOpacityStyle,
  styles,
} from './styles';

export const OneCardReading = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useUnistyles();
  const dispatch = useAppDispatch();
  const [cardId, setCardId] = useState<string>();
  const flipProgress = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;
  const headingOpacity = useRef(new Animated.Value(1)).current;
  const cardLift = useRef(new Animated.Value(0)).current;
  const cardSize = useRef(new Animated.Value(0)).current;
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChooseCard = () => {
    if (isAnimating || isRevealed) {
      return;
    }

    const card = drawTarotCard();
    setCardId(card.id);
    dispatch(addTarotReading({ type: 'one', cardIds: [card.id] }));
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
        Animated.parallel([
          Animated.timing(resultOpacity, {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(headingOpacity, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(cardLift, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(cardSize, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => setIsAnimating(false));
      });
    });
  };

  const handleTryAnotherCard = () => {
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
      Animated.timing(headingOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(cardLift, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(cardSize, {
        toValue: 0,
        duration: 300,
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

  const cardScaleX = flipProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const cardTranslateY = cardLift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, CARD_LIFT_OFFSET],
  });
  const cardScale = cardSize.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });
  const drawnCard = getTarotCard(cardId);
  const cardImage = isRevealed ? drawnCard.image : appImages.tarotCard;

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
        <Animated.View
          style={[styles.heading, getOpacityStyle(headingOpacity)]}
        >
          <Text variant='heading1' color={theme.textGold} textAlign='center'>
            {t('focusOnYourQuestion')}
          </Text>
          <Text variant='body' textAlign='center'>
            {t('focusOnYourQuestionDescription')}
          </Text>
        </Animated.View>

        <Animated.Image
          source={cardImage}
          style={[
            styles.tarotCard,
            getCardAnimationStyle(cardTranslateY, cardScale, cardScaleX),
          ]}
          resizeMode='contain'
        />

        <Animated.View
          pointerEvents={isAnimating ? 'none' : 'auto'}
          style={styles.buttonWrapper}
        >
          {isRevealed ? (
            <Animated.View
              style={[styles.resultContent, getOpacityStyle(resultOpacity)]}
            >
              <View style={styles.resultBox}>
                <Text
                  variant='body'
                  color={theme.textPrimary}
                  textAlign='center'
                >
                  {t(drawnCard.meaningKey)}
                </Text>
              </View>
              <Button
                variant='outline'
                fullWidth
                onPress={handleTryAnotherCard}
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
                onPress={handleChooseCard}
              >
                {t('chooseYourCard')}
              </Button>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </MainLayout>
  );
};
