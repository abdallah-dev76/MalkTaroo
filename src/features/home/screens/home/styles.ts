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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: theme.backgroundSecondary,

    borderRadius: wScale(12),
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    flex: 1,
  },
  dailyText: {
    gap: spacing.md,
    width: '55%',
  },
  bold: {
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '40%',
    aspectRatio: 1,
  },
  magicBallImage: {
    width: '100%',
    height: '100%',
  },
  magicBallGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    tintColor: theme.textGold,
    transform: [{ scale: 1.12 }],
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
