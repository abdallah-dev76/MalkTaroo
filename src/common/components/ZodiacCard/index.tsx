import { View } from 'react-native';
import { isArabic } from '@common/utils/appSettings';
import Avatar from '../Avatar';
import Text from '../Text';
import { styles } from './styles';
import type { ZodiacProps } from '@common/data/zodiac';

export const ZodiacCard = ({
  item: { nameAr, nameEn, image, dateRange },
  IsSelected,
}: {
  item: Partial<ZodiacProps>;
  IsSelected?: boolean;
}) => {
  return (
    <View style={[styles.container, IsSelected && styles.selected]}>
      <View style={styles.textContainer}>
        <Text variant='label' textAlign='center'>
          {isArabic ? nameAr : nameEn}
        </Text>
        <Text variant='caption' color='textSecondary' textAlign='center'>
          {dateRange}
        </Text>
      </View>
      <View>
        <Avatar source={image} isBorder size='medium' />
      </View>
    </View>
  );
};

export default ZodiacCard;
