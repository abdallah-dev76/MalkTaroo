import { icons, IconName } from '@assets/icons';
import { View } from 'react-native';
import { DEFAULT_ICON_SIZE, styles } from './styles';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  isFocused?: boolean;
};

export const Icon = ({
  name,
  size = DEFAULT_ICON_SIZE,
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

export default Icon;
