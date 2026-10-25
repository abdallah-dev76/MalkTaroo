import { StyleSheet } from 'react-native-unistyles';
import { wScale } from '@common/utils';
import { radius, spacing } from '@theme/spacing';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: theme.borderGold,
    borderRadius: radius.md,
  },
  image: {
    width: wScale(100),
    aspectRatio: 1,
  },
  details: {
    flex: 1,
    gap: spacing.sm,
  },
}));
