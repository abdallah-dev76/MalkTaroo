import { spacing } from '@theme/spacing';
import { hScale, wScale } from '@common/utils';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 0,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: spacing.xxxl,
  },
  loader: {
    width: wScale(130),
    height: hScale(130),
  },
});
