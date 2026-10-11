import { View } from 'react-native';
import Avatar from '../Avatar';
import Text from '../Text';
import { ZodiacCardProps } from './types';
import { styles } from './styles';

export const ZodiacCard = ({
  item: { name, image, date },
  IsSelected,
}: {
  item: ZodiacCardProps;
  IsSelected?: boolean;
}) => {
  return (
    <View style={[styles.container, IsSelected && styles.selected]}>
      <View style={styles.textContainer}>
        <Text variant='label' textAlign='center'>
          {name}
        </Text>
        <Text variant='caption' color='textSecondary' textAlign='center'>
          {date}
        </Text>
      </View>
      <View>
        <Avatar source={image} isBorder size='medium' />
      </View>
    </View>
  );
};

export default ZodiacCard;
