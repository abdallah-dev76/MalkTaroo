import { StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '@theme/spacing';

export const contentStyle = (top: number): ViewStyle => ({
  position: 'absolute',
  top,
  left: 0,
  right: 0,
  alignItems: 'center',
  paddingHorizontal: spacing.lg,
});

export const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 0,
  },
  background: {
    flex: 1,
  },
  button: {
    marginTop: spacing.lg,
  },
});
