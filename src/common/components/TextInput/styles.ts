import { StyleSheet } from 'react-native-unistyles';
import { fontScale, hScale, wScale } from '@common/utils';
import { spacing } from '@theme/spacing';

export const styles = StyleSheet.create(theme => ({
  container: {
    gap: hScale(12),
  },
  textInputAndErr: { gap: spacing.sm },
  searchIconContainer: {
    alignSelf: 'center',
    marginEnd: wScale(12),
    marginStart: spacing.xxs,
  },
  textInputContainer: {
    backgroundColor: theme.inputBackground,
    paddingHorizontal: wScale(12),
    paddingVertical: hScale(14),
    borderRadius: wScale(12),
    flexDirection: 'row',
    borderWidth: wScale(1),
    borderColor: theme.inputBorder,
  },
  textInput: {
    fontSize: fontScale(16),
    color: theme.textPrimary,
    flex: 1,
  },
  label: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  iconContainer: {
    marginEnd: spacing.md,
  },
}));

export default styles;
