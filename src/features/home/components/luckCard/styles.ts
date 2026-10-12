import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';
import { hScale, wScale } from '@common/utils';
import type { Colors } from '@theme/theme';

export const LUCK_ICON_SIZE = wScale(28);

export const styles = StyleSheet.create(theme => ({
  card: {
    alignItems: 'center',
    gap: spacing.xs,
    justifyContent: 'center',
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    paddingHorizontal: wScale(10),
    paddingVertical: hScale(10),
    borderRadius: wScale(12),
    flex: 1,
  },
  cardCompact: {
    flex: 0,
    width: '46%',
  },
  neonText: (color: Colors) => ({
    shadowColor: theme[color],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  }),
  progressTrack: (color: Colors) => ({
    width: '100%',
    height: hScale(12),
    backgroundColor: 'transparent',
    borderRadius: wScale(12),
    borderWidth: wScale(1),
    borderColor: theme[color],
  }),
  progressFill: (color: Colors, score: number) => ({
    backgroundColor: theme[color],
    shadowColor: theme[color],
    width: `${(score / 10) * 100}%` as const,
    height: '100%',
    borderRadius: wScale(12),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  }),
}));
