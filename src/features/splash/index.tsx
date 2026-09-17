import { appImages } from '@assets/images';
import { MainLayout } from '@common/components';
import { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import { appAnimations } from '@assets/animations';
import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@common/types.ts';

export const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <MainLayout
      edges={['top', 'right', 'left']}
      statusBarTranslucent
      style={styles.layout}
    >
      <ImageBackground
        source={appImages.splash}
        style={styles.background}
        resizeMode='cover'
      >
        <LottieView
          source={appAnimations.loader}
          style={styles.loader}
          autoPlay
          loop
        />
      </ImageBackground>
    </MainLayout>
  );
};
