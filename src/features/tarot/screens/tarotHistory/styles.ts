import { radius, spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';
import { hScale, wScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  list: {
    flexGrow: 1,
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
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
  thumbnails: {
    flexDirection: 'row',
    gap: spacing.xxs,
  },
  thumbnail: {
    width: 48,
    height: 72,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: theme.borderGold,
  },
  smallThumbnail: {
    width: 32,
    height: 48,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: theme.borderGold,
  },
  itemText: {
    flex: 1,
    gap: spacing.xxs,
  },
  detail: {
    marginTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  detailContent: {
    alignItems: 'center',
    gap: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: theme.background,
  },
  detailCard: {
    width: 180,
    height: 280,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: theme.borderGold,
  },
  periodRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  periodColumn: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },
  periodCard: {
    width: wScale(90),
    height: hScale(150),
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: theme.borderGold,
  },
  periodReading: {
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: theme.backgroundElevated,
    width: '100%',
  },
  resultBox: {
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: theme.backgroundElevated,
    width: '100%',
  },
}));
