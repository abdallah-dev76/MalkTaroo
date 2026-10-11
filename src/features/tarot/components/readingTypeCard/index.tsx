import { Text } from '@common/components';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { ReadingTypeCardProps } from './types';

export const ReadingTypeCard = ({
  title,
  subTitle,
  image,
  tags,
  onPress,
}: ReadingTypeCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Image source={image} style={styles.image} resizeMode='contain' />
        </View>
        <View style={styles.content}>
          <Text>{title}</Text>
          <Text variant='caption' color='textSecondary'>
            {subTitle}
          </Text>
          <View style={styles.tags}>
            {tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text variant='caption' color='textGold'>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
