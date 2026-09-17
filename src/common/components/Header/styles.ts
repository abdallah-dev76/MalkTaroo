import { isArabic } from '@common/utils/appSettings';
import { spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

export const ICON_CONTAINER_WIDTH = 40;

export const styles = StyleSheet.create({
  container: {
    flexDirection: isArabic ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  iconContainer: {
    width: ICON_CONTAINER_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    position: 'absolute',
    left: ICON_CONTAINER_WIDTH + spacing.md,
    right: ICON_CONTAINER_WIDTH + spacing.md,
    bottom: spacing.lg,
    alignItems: 'center',
  },
});
