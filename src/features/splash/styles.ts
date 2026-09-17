import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';
import { hScale, wScale } from '@common/utils/normalize';

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
    width: wScale(180),
    height: hScale(180),
  },
});
