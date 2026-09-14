import type { ImageProps, ImageSourcePropType } from 'react-native';

type AvatarSize = 'small' | 'medium' | 'large';

export interface AvatarProps extends ImageProps {
  size?: AvatarSize;
  localImage?: ImageSourcePropType;
  imageUrl?: string;
  isGirl?: boolean;
  isBorder?: boolean;
  onPress?: () => void;
  
}
