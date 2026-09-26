import { StyleSheet } from 'react-native-unistyles';
import { radius, spacing } from '@theme/spacing';

export const styles = StyleSheet.create(theme => ({
  layout: {
    paddingHorizontal: 0,
  },
  content: {
    paddingBottom: spacing.lg,
  },
  heroTitle: {
    gap: spacing.xxs,
  },
  zodiacRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.backgroundElevated,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: theme.borderGold,
    backgroundColor: theme.zodiacBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.backgroundElevated,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    padding: spacing.md,
  },
  settingText: {
    flex: 1,
    gap: spacing.xxs,
  },
  divider: {
    height: 1,
    backgroundColor: theme.divider,
  },
  segment: {
    flexDirection: 'row',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: theme.borderGold,
    overflow: 'hidden',
  },
  segmentItem: (active: boolean) => ({
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: active ? theme.primary : 'transparent',
  }),
}));
