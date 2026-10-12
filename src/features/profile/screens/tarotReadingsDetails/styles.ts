import { hScale, wScale } from '@common/utils';
import { radius, spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
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
    width: wScale(180),
    height: hScale(280),
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
