import { Image, ImageSourcePropType, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from '@common/components';
import { styles } from './styles';
import { RootStackParamList } from '@common/types.ts';

interface ZodiacListItemProps {
  image: ImageSourcePropType;
  title: string;
  dateRange: string;
  id: string;
}

export const ZodiacListItem = ({
  image,
  title,
  dateRange,
  id,
}: ZodiacListItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('ZodiacDetails', { id });
      }}
    >
      <Image source={image} resizeMode='contain' style={styles.image} />
      <View style={styles.details}>
        <Text color='textGold'>{title}</Text>
        <Text variant='label' color='textSecondary'>
          {dateRange}
        </Text>
      </View>
    </Pressable>
  );
};
