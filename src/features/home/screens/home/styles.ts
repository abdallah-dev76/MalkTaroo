import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';
import { wScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  content: {
    gap: spacing.lg,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContent: {
    gap: spacing.md,
  },
  dailyMessage: {
    gap: spacing.md,
    backgroundColor: 'red',
    borderRadius: wScale(16),
    borderWidth: wScale(1),
    borderColor: theme.border,
    overflow: 'hidden',
  },
  dailyOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  lightOverlay: {
    backgroundColor: 'white',
  },
  darkOverlay: {
    backgroundColor: 'black',
  },
  dailyContent: {
    padding: spacing.lg,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
  },
  dailyText: {
    gap: wScale(6),
    flex: 1,
  },
}));
