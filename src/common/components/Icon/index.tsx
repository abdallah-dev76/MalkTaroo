import { icons, IconName } from '@assets/icons';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  isFocused?: boolean;
};

export const Icon = ({
  name,
  size = 24,
  color = '#749',
  isFocused = false,
}: Props) => {
  const SvgIcon = icons[name];

  return (
    <View style={styles.icon(size, color, isFocused)}>
      <SvgIcon width={size} height={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create(() => ({
  icon: (size: number, color: string, isFocused: boolean) => ({
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',

    ...(isFocused && {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 6,
      elevation: 6,
    }),
  }),
}));

export default Icon;
