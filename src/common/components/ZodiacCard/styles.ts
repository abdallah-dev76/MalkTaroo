import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
