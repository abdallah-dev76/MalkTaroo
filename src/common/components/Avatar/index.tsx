// Memoize imageSource so it's only recalculated if dependencies change
import { Image, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import { styles } from './styles';
import { AvatarProps } from './types';
import { appImages } from '@assets/images';

export const Avatar = ({
  size = 'medium',
  localImage,
  imageUrl,
  isGirl = false,
  onPress,
  isBorder,
  ...props
}: AvatarProps) => {
  const imageSource = useMemo(() => {
    if (imageUrl) {
      return { uri: imageUrl };
    }
    if (localImage) {
      return localImage;
    }
    if (isGirl) {
      return appImages.woman;
    }
    return appImages.man;
  }, [imageUrl, isGirl, localImage]);

  styles.useVariants({ size });

  return (
    <Pressable
      style={styles.container(isBorder)}
      onPress={onPress}
      pointerEvents={onPress ? 'auto' : 'none'}
    >
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode='cover'
        {...props}
      />
    </Pressable>
  );
};

export default React.memo(Avatar);
