import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/index';

export const styles = StyleSheet.create(() => ({
  layout: {
    paddingHorizontal: 0,
  },

  background: {
    flex: 1,
  },

  content: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.7,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
}));
