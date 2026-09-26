import { StyleSheet } from 'react-native-unistyles';
import { radius, spacing } from '@theme/index';

export const styles = StyleSheet.create(theme => ({
  container: {
    padding: spacing.lg,
    backgroundColor: theme.backgroundSecondary,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.inputBorder,
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radius.md,
  },

  content: {
    gap: spacing.xs,
  },
}));
