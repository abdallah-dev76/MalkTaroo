import { wScale, hScale } from '@common/utils';
import { radius, spacing } from '@theme/index';
import type { Animated } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const getOpacityStyle = (opacity: Animated.Value) => ({ opacity });

export const getCardAnimationStyle = (scaleX: Animated.Value) => ({
  transform: [{ scaleX }],
});

export const styles = StyleSheet.create(theme => ({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    gap: spacing.lg,
  },

  heading: {
    alignItems: 'center',
    gap: spacing.xs,
  },

  cards: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },

  cardColumn: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },

  tarotCard: {
    width: wScale(90),
    height: hScale(150),
  },

  cardReading: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: theme.backgroundElevated,
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
}));
