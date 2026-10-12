import { spacing } from '@theme/spacing';
import { wScale } from '@common/utils/normalize';
import { StyleSheet } from 'react-native-unistyles';

const ICON_CONTAINER_WIDTH = wScale(40);

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: ICON_CONTAINER_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
  },
  hello: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
