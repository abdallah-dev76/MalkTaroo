import { StyleSheet } from 'react-native-unistyles';
import { wScale } from '@common/utils/normalize';
import { spacing } from '@theme/spacing';
import type { Colors } from '@theme/theme';

export const styles = StyleSheet.create(theme => ({
  container: {
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heading: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  headingTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    minWidth: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: theme.borderGold,
    borderRadius: 8,
    backgroundColor: theme.backgroundSecondary,
    overflow: 'hidden',
  },
  wideCard: {
    width: 'auto',
    flexBasis: '47%',
    flexGrow: 1,
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
    gap: spacing.sm,
  },
  cardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  track: {
    height: 4,
    backgroundColor: theme.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: (score: number, color: Colors) => ({
    height: '100%',
    width: `${score * 10}%`,
    backgroundColor: theme[color],
  }),
  message: {
    flexShrink: 1,
  },
  artwork: {
    width: wScale(84),
    maxWidth: '28%',
    height: wScale(116),
    borderRadius: 6,
  },
}));
