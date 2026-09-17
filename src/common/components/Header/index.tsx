import { PropsWithChildren } from 'react';
import { View, Pressable } from 'react-native';
import Text from '../Text';
import Icon from '../Icon';
import { IconName } from '@assets/icons';
import { styles } from './styles';

export const Header = ({ children }: PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>;
};

Header.Icon = ({
  name,
  color,
  size,
  onPress,
}: {
  name: IconName;
  color: string;
  size: number;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.iconContainer} onPress={onPress}>
      <Icon name={name} color={color} size={size} />
    </Pressable>
  );
};

Header.Title = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.titleContainer}>
      <Text textAlign='center'>{children}</Text>
    </View>
  );
};
