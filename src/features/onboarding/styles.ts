import { StyleSheet } from 'react-native-unistyles';
import { radius, spacing } from '@theme/spacing';

export const styles = StyleSheet.create(theme => ({
  layout: {
    paddingHorizontal: 0,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  formCard: {
    flexGrow: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  backgroundImage: {
    position: 'absolute',
  },
  birthdateSection: {
    gap: spacing.sm,
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dateDay: {
    flex: 1,
  },
  dateMonth: {
    flex: 1.6,
  },
  dateYear: {
    flex: 1.2,
  },
  previewCard: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.border,
  },
  submitButton: {
    marginTop: spacing.md,
  },
}));
