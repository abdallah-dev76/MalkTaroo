import { StyleSheet } from 'react-native-unistyles';
import { radius, spacing } from '@theme/index';
import { wScale, hScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  container: {
    padding: spacing.md,
    backgroundColor: theme.backgroundSecondary,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.inputBorder,
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radius.md,
  },

  content: {
    gap: spacing.xs,
  },
  image: {
    width: wScale(75),
    height: hScale(75),
  },
}));
