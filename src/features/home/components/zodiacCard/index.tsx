import { Text } from '@common/components';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { styles } from './styles';

interface ZodiacCardProps {
  image: ImageSourcePropType;
  title: string;
  dateRange: string;
}

export const ZodiacCard = ({ image, title, dateRange }: ZodiacCardProps) => (
  <ImageBackground source={image} resizeMode='cover' style={styles.card}>
    <Text variant='caption' color='textGold'>
      {title}
    </Text>
    <Text variant='caption' color='textSecondary'>
      {dateRange}
    </Text>
  </ImageBackground>
);

export default ZodiacCard;
