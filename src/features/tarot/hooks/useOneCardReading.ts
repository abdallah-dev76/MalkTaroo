import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { drawTarotCard } from '@common/data/tarot';
import { addTarotReading, useAppDispatch } from '@store';

export const useOneCardReading = (liftOffset: number) => {
  const dispatch = useAppDispatch();
  const [cardId, setCardId] = useState<string>();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const flipProgress = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;
  const headingOpacity = useRef(new Animated.Value(1)).current;
  const cardLift = useRef(new Animated.Value(0)).current;
  const cardSize = useRef(new Animated.Value(0)).current;

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
  return {
    cardId,
    isRevealed,
    isAnimating,
    buttonOpacity,
    resultOpacity,
    headingOpacity,
    handleChooseCard,
    handleTryAnotherCard,
    cardScaleX: flipProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    cardTranslateY: cardLift.interpolate({
      inputRange: [0, 1],
      outputRange: [0, liftOffset],
    }),
    cardScale: cardSize.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.5],
    }),
  };
};
