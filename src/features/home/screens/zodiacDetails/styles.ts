import { wScale } from '@common/utils/normalize';
import { radius, spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    gap: spacing.md,
  },
  box: {
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: theme.backgroundSecondary,
  },
  zodiacData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  heroImage: {
    width: '40%',
    aspectRatio: 1,
    borderRadius: radius.sm,
  },
  heroContent: {
    flex: 1,
    gap: spacing.xs,
  },
  tags: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: radius.sm,
  },
  section: (tone: 'gold' | 'success' | 'error') => ({
    flexGrow: 1,
    borderWidth: wScale(1),
    borderColor: tone === 'gold' ? theme.borderGold : theme[tone],
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: theme.backgroundSecondary,
    gap: spacing.xs,
  }),
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    flex: 1,
  },
  icon: {
    marginEnd: spacing.xs,
  },
  traits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  trait: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    borderRadius: radius.md,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'stretch',
  },
  column: {
    flexGrow: 1,
    flexBasis: '45%',
    minWidth: wScale(140),
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bullet: (tone: 'success' | 'error') => ({
    width: wScale(5),
    height: wScale(5),
    borderRadius: radius.full,
    backgroundColor: theme[tone],
  }),
  bulletText: {
    flex: 1,
  },
  compatibility: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  compatibilityCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.xs,
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    borderRadius: radius.sm,
    gap: spacing.xs,
  },
  compatibilityImage: {
    maxWidth: wScale(80),
    maxHeight: wScale(80),
  },
  bold: {
    fontWeight: 'bold',
  },
}));
