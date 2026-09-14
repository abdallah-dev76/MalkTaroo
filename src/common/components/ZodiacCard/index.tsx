import { View } from 'react-native';
import Avatar from '../Avatar';
import Text from '../Text';
import { ZodiacCardProps } from './types';
import { spacing } from '@theme/index';

export const ZodiacCard = ({ name, image, duration }: ZodiacCardProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        gap: spacing.sm,
      }}
    >
      <Avatar source={image} isBorder />

      <View>
        <Text variant='caption' textAlign='center'>
          {name}
        </Text>
        <Text variant='small' color='textSecondary' textAlign='center'>
          {duration}
        </Text>
      </View>
    </View>
  );
};

export default ZodiacCard;
