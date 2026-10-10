import { StyleSheet } from 'react-native-unistyles';
import { fontScale, wScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  container: {
    gap: wScale(12),
  },
  textInputAndErr: { gap: wScale(8) },
  searchIconContainer: {
    alignSelf: 'center',
    marginEnd: wScale(12),
    marginStart: wScale(2),
  },
  textInputContainer: {
    backgroundColor: theme.inputBackground,
    paddingHorizontal: wScale(12),
    paddingVertical: wScale(14),
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
    gap: wScale(4),
  },
  iconContainer: {
    marginEnd: wScale(16),
  },
}));

export default styles;
