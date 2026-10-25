import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { drawTarotCards, TAROT_PERIODS } from '@common/data/tarot';
import { addTarotReading, useAppDispatch } from '@store';

export const useThreeCardReading = () => {
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
  return {
    cardIds,
    isRevealed,
    isAnimating,
    flipProgress,
    buttonOpacity,
    resultOpacity,
    handleRevealCards,
    handleTryAnotherReading,
  };
};
