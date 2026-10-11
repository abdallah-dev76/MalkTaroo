import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';
import { hScale, wScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  card: {
    flexDirection: 'row',
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    borderRadius: wScale(12),
    gap: spacing.md,
    overflow: 'hidden',
  },
  details: {
    justifyContent: 'space-between',
    width: wScale(120),
    paddingStart: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  description: {
    marginTop: spacing.sm,
  },
  image: {
    height: hScale(180),
    width: wScale(120),
    backgroundColor: 'black',
  },
}));
