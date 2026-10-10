import { appImages } from '@assets/images';
import { MainLayout } from '@common/components';
import { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import LottieView from 'lottie-react-native';
import { appAnimations } from '@assets/animations';
import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@common/types.ts';
import { useAppSelector } from '@store';
import { Storage } from '@common/storage/storage';
import { StorageKeys } from '@common/storage/enum';

export const Splash = () => {
  const { rt } = useUnistyles();
  const themeName = rt.themeName;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isOnboarded = useAppSelector(state => state.profile.isOnboarded);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(
        Storage.getBoolean(StorageKeys.IS_FIRST_LAUNCH_DONE)
          ? 'MainTabs'
          : 'Onboarding',
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOnboarded, navigation]);

  return (
    <MainLayout
      edges={['top', 'right', 'left']}
      statusBarTranslucent
      style={styles.layout}
    >
      <ImageBackground
        source={
          themeName === 'light' ? appImages.splashLight : appImages.splash
        }
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
