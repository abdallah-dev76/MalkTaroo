import { Avatar, Text } from '@common/components';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { ReadingTypeCardProps } from './types';

export const ReadingTypeCard = ({
  title,
  subTitle,
  image,
  onPress,
}: ReadingTypeCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Image source={image} style={styles.image} resizeMode='contain' />
        </View>
        <View style={styles.content}>
          <Text variant='body'>{title}</Text>
          <Text variant='caption' color='textSecondary'>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
