import { Text } from '@common/components';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@common/types.ts';

interface ZodiacCardProps {
  image: ImageSourcePropType;
  title: string;
  dateRange: string;
  id: string;
  style?: StyleProp<ViewStyle>;
}

export const ZodiacCard = ({
  image,
  title,
  dateRange,
  style,
  id,
}: ZodiacCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ZodiacDetails', { id });
      }}
    >
      <ImageBackground
        source={image}
        resizeMode='cover'
        style={[styles.card, style]}
      >
        <Text variant='caption' color='textGold'>
          {title}
        </Text>
        <Text variant='caption' color='textSecondary'>
          {dateRange}
        </Text>
      </ImageBackground>
    </Pressable>
  );
};
export default ZodiacCard;
