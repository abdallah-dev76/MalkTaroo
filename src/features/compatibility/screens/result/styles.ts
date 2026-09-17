import { StyleSheet } from 'react-native-unistyles';
import { radius, spacing } from '@theme/index';
import { isArabic } from '@common/utils/appSettings';

export const styles = StyleSheet.create(theme => ({
  layout: {
    marginTop: spacing.lg,
  },

  content: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },

  zodiacRow: {
    flexDirection: isArabic ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  zodiacItem: {
    alignItems: 'center',
    gap: spacing.md,
  },

  compatibilityWrapper: {
    alignItems: 'center',
  },

  descriptionBox: {
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: theme.backgroundElevated,
  },

  divider: {
    position: 'absolute',
    top: '55%',
    left: 0,
    zIndex: -1,
    width: '100%',
    height: 4,
    marginTop: -40,
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
