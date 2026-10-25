import { StyleSheet } from 'react-native-unistyles';
import { spacing } from '@theme/spacing';
import { hScale, wScale } from '@common/utils';

export const styles = StyleSheet.create(theme => ({
  card: {
    flexDirection: 'row',
    width: wScale(258),
    maxWidth: '100%',
    minHeight: hScale(180),
    borderWidth: wScale(1),
    borderColor: theme.borderGold,
    borderRadius: wScale(12),
    gap: spacing.md,
    overflow: 'hidden',
  },
  details: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'space-between',
    paddingStart: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  textContent: {
    flexShrink: 0,
  },
  button: {
    flexShrink: 0,
  },
  description: {
    marginTop: spacing.sm,
  },
  imageContainer: {
    width: wScale(120),
    flexShrink: 0,
    backgroundColor: 'black',
  },
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));
