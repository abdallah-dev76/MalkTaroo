import { radius, spacing } from '@theme/index';
import { hScale } from '@common/utils/normalize';
import type { Animated } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const CARD_LIFT_OFFSET = 0;

export const getOpacityStyle = (opacity: Animated.Value) => ({ opacity });

export const getCardAnimationStyle = (
  translateY: Animated.AnimatedInterpolation<number>,
  scale: Animated.AnimatedInterpolation<number>,
  scaleX: Animated.AnimatedInterpolation<number>,
) => ({
  transform: [{ translateY }, { scale }, { scaleX }],
});

export const styles = StyleSheet.create(theme => ({
  content: {
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.lg,
  },

  heading: (hidden: boolean) => ({
    alignItems: 'center',
    gap: spacing.xs,
    display: hidden ? 'none' : 'flex',
  }),

  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },

  cardFrame: {
    width: '49%',
    aspectRatio: 2 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  revealedCardFrame: {
    width: '73.5%',
  },

  tarotCard: (isRevealed: boolean) => ({
    width: isRevealed ? '66.666667%' : '100%',
    height: isRevealed ? '66.666667%' : '100%',
  }),

  buttonWrapper: {
    width: '100%',
    minHeight: hScale(52),
    justifyContent: 'center',
  },

  resultContent: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.md,
  },

  resultBox: {
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: theme.backgroundElevated,
    width: '100%',
    marginBottom: spacing.md,
  },
}));
