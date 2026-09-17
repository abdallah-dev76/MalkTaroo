import { I18nManager } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
  },
});
