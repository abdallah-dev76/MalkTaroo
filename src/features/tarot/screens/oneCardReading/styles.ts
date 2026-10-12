import { radius, spacing } from '@theme/index';
import { hScale } from '@common/utils/normalize';
import type { Animated } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const CARD_LIFT_OFFSET = hScale(-80);

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },

  heading: {
    alignItems: 'center',
    gap: spacing.xs,
  },

  tarotCard: {
    width: '49%',
    height: '47%',
  },

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
