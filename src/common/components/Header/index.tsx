import { PropsWithChildren } from 'react';
import {
  View,
  Pressable,
  TextStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Text from '../Text';
import Icon from '../Icon';
import { IconName } from '@assets/icons';
import { styles } from './styles';
import { appImages } from '@assets/images';
import Avatar from '../Avatar';

export const Header = ({
  style,
  children,
}: PropsWithChildren<{ style?: StyleProp<TextStyle> }>) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

Header.Icon = ({
  name,
  color,
  size,
  onPress,
}: {
  name: IconName;
  color?: string;
  size?: number;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.iconContainer} onPress={onPress}>
      <Icon name={name} color={color} size={size ?? 24} />
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

Header.Hello = ({
  zodiac,
  children,
}: PropsWithChildren<{ zodiac?: string }>) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
      }}
    >
      <Avatar
        source={
          zodiac ? appImages[zodiac as keyof typeof appImages] : undefined
        }
        size='small'
        isBorder
      />
      <Text variant='heading2'>{children}</Text>
    </View>
  );
};
