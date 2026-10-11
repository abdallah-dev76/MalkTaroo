import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/index';
import { wScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    minWidth: 0,
    width: '100%',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    flexDirection: 'row',
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    borderRadius: wScale(12),
    backgroundColor: theme.backgroundSecondary,
  },
  selected: {
    backgroundColor: 'rgba(255, 238, 0,0.1)',
  },
  textContainer: {
    flex: 1,
    gap: spacing.sm,
  },
}));
