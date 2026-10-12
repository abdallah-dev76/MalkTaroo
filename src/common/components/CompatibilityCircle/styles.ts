import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';
import { wScale } from '@common/utils/normalize';
import type { Animated } from 'react-native';

export const DEFAULT_CIRCLE_SIZE = wScale(180);
export const DEFAULT_STROKE_WIDTH = wScale(12);

export const getLabelAnimationStyle = (opacity: Animated.Value) => ({
  opacity,
});

export const styles = StyleSheet.create({
  container: (size: number) => ({
    width: size,
    height: size,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  }),
  circle: {
    position: 'absolute' as const,
    transform: [{ rotate: '-90deg' }],
  },
  label: {
    alignItems: 'center' as const,
    gap: spacing.xxs,
  },
});
