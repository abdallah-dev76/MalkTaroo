import { spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 0,
  },
  content: top => ({
    position: 'absolute',
    top,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  }),
  background: {
    flex: 1,
  },
  button: {
    marginTop: spacing.lg,
  },
});
