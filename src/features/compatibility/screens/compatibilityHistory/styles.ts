import { StyleSheet } from 'react-native-unistyles';
import { radius, spacing } from '@theme/spacing';

export const styles = StyleSheet.create(theme => ({
  list: {
    flexGrow: 1,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.backgroundElevated,
  },
  avatars: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  itemText: {
    flex: 1,
    gap: spacing.xxs,
  },
  itemEnd: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
  },
  detail: {
    marginTop: spacing.lg,
  },
}));
