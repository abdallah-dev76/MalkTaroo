import { radius, spacing } from '@theme/index';
import { StyleSheet } from 'react-native-unistyles';

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
    minHeight: 52,
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
    marginBottom: 16,
  },
}));
