import { Button, Text } from '@common/components';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@common/types.ts';

interface TarotCardProps {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
  cardLabel: string;
  learnMoreLabel: string;
  style?: StyleProp<ViewStyle>;
}

export const TarotCard = ({
  id,
  image,
  title,
  description,
  cardLabel,
  learnMoreLabel,
  style,
}: TarotCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.details}>
        <View style={styles.textContent}>
          <Text variant='label' color='textGold'>
            {title}
          </Text>
          <Text variant='label' color='textGold'>
            {cardLabel}
          </Text>
          <Text
            variant='caption'
            color='textSecondary'
            style={styles.description}
          >
            {description}
          </Text>
        </View>

        <Button
          variant='primary'
          size='small'
          style={styles.button}
          onPress={() => navigation.navigate('TarotCardDetails', { id })}
        >
          {learnMoreLabel}
        </Button>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode='contain' />
      </View>
    </View>
  );
};

export default TarotCard;
