import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';
import { wScale } from '@common/utils';

export const SECTION_ICON_SIZE = wScale(16);

export const styles = StyleSheet.create(theme => ({
  ph24: {
    paddingHorizontal: spacing.lg,
  },
  container: {
    paddingHorizontal: 0,
  },
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.lg,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  dailyMessage: {
    gap: spacing.md,
    borderRadius: wScale(12),
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
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
    opacity: 0.4,
  },
  lightOverlay: {
    backgroundColor: 'grey',
  },
  darkOverlay: {
    backgroundColor: 'black',
  },
  dailyContent: {
    padding: spacing.lg,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dailyText: {
    gap: spacing.md,
  },
  luckCardsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  luckCardsContainerCompact: {
    flexWrap: 'wrap',
  },
}));
