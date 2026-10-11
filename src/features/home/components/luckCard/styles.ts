import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';
import { hScale, wScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  card: {
    alignItems: 'center',
    gap: spacing.xs,
    justifyContent: 'center',
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    padding: wScale(10),
    borderRadius: wScale(12),
    flex: 1,
  },
  cardCompact: {
    flex: 0,
    width: '46%',
  },
  neonText: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  progressTrack: {
    width: '100%',
    height: hScale(12),
    backgroundColor: 'transparent',
    borderRadius: wScale(12),
    borderWidth: wScale(1),
  },
  progressFill: {
    height: '100%',
    borderRadius: wScale(12),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
}));
