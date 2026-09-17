import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/index';
import { isArabic } from '@common/utils/appSettings';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
    flexDirection: isArabic ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
  },
});
