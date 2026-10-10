import { Button, Text } from '@common/components';
import { Image, ImageSourcePropType, View } from 'react-native';
import { styles } from './styles';

interface TarotCardProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  cardLabel: string;
  learnMoreLabel: string;
}

export const TarotCard = ({
  image,
  title,
  description,
  cardLabel,
  learnMoreLabel,
}: TarotCardProps) => (
  <View style={styles.card}>
    <View style={styles.details}>
      <View>
        <Text variant='title' color='textGold'>
          {title}
        </Text>
        <Text variant='title' color='textGold'>
          {cardLabel}
        </Text>
        <Text variant='label' color='textSecondary' style={styles.description}>
          {description}
        </Text>
      </View>

      <Button variant='primary' size='small'>
        {learnMoreLabel}
      </Button>
    </View>
    <Image source={image} style={styles.image} />
  </View>
);

export default TarotCard;
