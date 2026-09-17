import { View } from 'react-native';
import Avatar from '../Avatar';
import Text from '../Text';
import { ZodiacCardProps } from './types';
import { styles } from './styles';

export const ZodiacCard = ({ name, image, date }: ZodiacCardProps) => {
  return (
    <View style={styles.container}>
      <Avatar source={image} isBorder />

      <View>
        <Text variant='caption' textAlign='center'>
          {name}
        </Text>
        <Text variant='small' color='textSecondary' textAlign='center'>
          {date}
        </Text>
      </View>
    </View>
  );
};

export default ZodiacCard;
