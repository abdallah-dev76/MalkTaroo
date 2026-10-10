import { spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

const ICON_CONTAINER_WIDTH = 40;
const HEADER_HEIGHT = 56;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    minHeight: HEADER_HEIGHT,
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

  helloContainer: {
    width: '60%',
  },
  helloText: {
    width: '100%',
  },
});
