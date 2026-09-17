import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  columnWrapper: {
    paddingBottom: 16,
  },
  item: {
    paddingVertical: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
}));
