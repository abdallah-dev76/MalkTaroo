import { StyleSheet } from 'react-native-unistyles';
import { radius, spacing } from '@theme/index';
import { hScale, wScale } from '@common/utils/normalize';
import type { Animated } from 'react-native';

export const HEART_ICON_SIZE = wScale(28);

export const getPulseStyle = (scale: Animated.Value) => ({
  transform: [{ scale }],
});

export const styles = StyleSheet.create(theme => ({
  content: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },

  zodiacRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  zodiacItem: {
    alignItems: 'center',
    gap: spacing.md,
  },

  zodiacData: { gap: spacing.sm, alignItems: 'center' },

  compatibilityWrapper: {
    alignItems: 'center',
  },

  descriptionBox: {
    borderWidth: 1,
    borderColor: theme.borderGold,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: theme.backgroundElevated,
    width: '100%',
  },

  divider: {
    position: 'absolute',
    top: '55%',
    left: 0,
    zIndex: -1,
    width: '100%',
    height: hScale(4),
    marginTop: hScale(-42),
    backgroundColor: theme.borderGold,
    shadowColor: theme.borderGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },

  heartWrapper: {
    position: 'absolute',
    top: '27%',
    left: '47%',
  },
}));
