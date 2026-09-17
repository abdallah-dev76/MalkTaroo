import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';

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
