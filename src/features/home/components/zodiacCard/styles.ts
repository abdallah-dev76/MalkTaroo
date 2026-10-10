import { StyleSheet } from 'react-native-unistyles';
import { hScale, wScale } from '@common/utils';

export const styles = StyleSheet.create(() => ({
  card: {
    padding: wScale(12),
    width: wScale(180),
    height: hScale(180),
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: wScale(12),
    overflow: 'hidden',
  },
}));
