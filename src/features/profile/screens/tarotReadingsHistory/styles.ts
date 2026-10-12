import { hScale, wScale } from '@common/utils/normalize';
import { radius, spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  list: {
    flexGrow: 1,
    gap: spacing.md,
    paddingBottom: spacing.xl,
    marginTop: spacing.lg,
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
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    backgroundColor: theme.backgroundSecondary,
  },
  thumbnails: {
    flexDirection: 'row',
    gap: spacing.xxs,
  },
  thumbnail: {
    width: wScale(48),
    height: hScale(72),
    borderRadius: radius.sm,
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
  },
  smallThumbnail: {
    width: wScale(32),
    height: hScale(48),
    borderRadius: radius.sm,
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
  },
  itemText: {
    flex: 1,
    gap: spacing.xxs,
  },
}));
