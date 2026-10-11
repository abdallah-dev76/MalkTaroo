import { spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  content: {
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  row: {
    gap: spacing.md,
  },
  item: {
    flex: 1,
  },
});
