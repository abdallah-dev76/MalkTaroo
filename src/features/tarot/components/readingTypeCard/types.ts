import { ImageSourcePropType } from 'react-native';

export interface ReadingTypeCardProps {
  title: string;
  subTitle: string;
  image: ImageSourcePropType;
  onPress: () => void;
}
