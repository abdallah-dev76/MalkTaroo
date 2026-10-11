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
    paddingBottom: hScale(90),
  },
  loader: {
    width: wScale(100),
    height: hScale(100),
  },
});
