import { StyleSheet } from 'react-native-unistyles';
import { hScale, wScale } from '@common/utils';
import { spacing } from '@theme/spacing';

export const ITEM_HEIGHT = hScale(48);

export const styles = StyleSheet.create(theme => ({
  container: {
    gap: hScale(12),
  },
  trigger: {
    backgroundColor: theme.inputBackground,
    paddingHorizontal: wScale(10),
    paddingVertical: hScale(14),
    borderRadius: wScale(12),
    borderWidth: wScale(1),
    borderColor: theme.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  triggerText: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
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
    padding: spacing.md,
    borderBottomWidth: wScale(1),
    borderBottomColor: theme.inputBorder,
  },
  option: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  optionSelected: {
    backgroundColor: theme.inputBackground,
  },
}));

export default styles;
