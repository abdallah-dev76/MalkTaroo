import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';
import { hScale, wScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  card: {
    flexDirection: 'row',
    borderWidth: wScale(1),
    borderColor: theme.border,
    borderRadius: wScale(12),
    padding: spacing.md,
    gap: spacing.md,
  },
  details: {
    justifyContent: 'space-between',
    width: wScale(120),
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
