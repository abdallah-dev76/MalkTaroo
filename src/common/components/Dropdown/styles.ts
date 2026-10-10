import { StyleSheet } from 'react-native-unistyles';
import { wScale } from '@common/utils';

export const ITEM_HEIGHT = 48;

export const styles = StyleSheet.create(theme => ({
  container: {
    gap: wScale(12),
  },
  trigger: {
    backgroundColor: theme.inputBackground,
    paddingHorizontal: wScale(10),
    paddingVertical: wScale(14),
    borderRadius: wScale(12),
    borderWidth: wScale(1),
    borderColor: theme.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: wScale(4),
  },
  triggerText: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: wScale(24),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sheet: {
    maxHeight: '60%',
    borderRadius: wScale(16),
    borderWidth: wScale(1),
    borderColor: theme.inputBorder,
    backgroundColor: theme.backgroundElevated,
    overflow: 'hidden',
  },
  sheetTitle: {
    padding: wScale(16),
    borderBottomWidth: wScale(1),
    borderBottomColor: theme.inputBorder,
  },
  option: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: wScale(16),
  },
  optionSelected: {
    backgroundColor: theme.inputBackground,
  },
}));

export default styles;
