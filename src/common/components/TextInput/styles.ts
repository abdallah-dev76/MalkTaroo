import { StyleSheet } from 'react-native-unistyles';
import { fontScale, wScale } from '@common/utils/normalize';
import { I18nManager } from 'react-native';

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
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    borderWidth: wScale(1),
    borderColor: theme.inputBorder,
  },
  textInput: {
    fontSize: fontScale(16),
    color: theme.textPrimary,
    flex: 1,
  },
  label: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    gap: wScale(4),
  },
}));

export default styles;
