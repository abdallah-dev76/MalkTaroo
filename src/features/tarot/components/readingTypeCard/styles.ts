import { StyleSheet } from 'react-native-unistyles';
import { radius, spacing } from '@theme/index';
import { wScale, hScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  container: {
    padding: spacing.md,
    backgroundColor: theme.backgroundSecondary,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.borderGold,
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
  },

  content: {
    gap: spacing.sm,
    flex: 1,
  },
  tags: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: theme.borderGold,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: radius.full,
    marginBottom: spacing.xs,
  },
  image: {
    width: wScale(120),
    height: hScale(120),
  },
}));
