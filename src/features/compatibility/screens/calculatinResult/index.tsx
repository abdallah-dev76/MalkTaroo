import { Text } from '@common/components';
import MainLayout from '@common/components/MainLayout';
import { ImageBackground, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appImages } from '@assets/images';
import { useUnistyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import { CompatibilityStackParamList } from '@common/types.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCompatibility } from '../../context/CompatibilityContext';

export const CalculatingResult = () => {
  const { rt } = useUnistyles();
  const themeName = rt.themeName;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();
  const { selection } = useCompatibility();
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Result');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [navigation, selection]);

  return (
    <MainLayout
      statusBarTranslucent={true}
      style={styles.layout}
      edges={['top', 'right', 'left']}
    >
      <ImageBackground
        source={
          themeName === 'light' ? appImages.zodiacLight : appImages.zodiac
        }
        resizeMode='cover'
        style={styles.background}
      >
        <View style={styles.content}>
          <Text variant='heading1'>
            {t('calculatingResult')}
            {dots}
          </Text>
          <Text variant='heading3' color='textSecondary' textAlign='center'>
            {t('calculatingResultDescription')}
          </Text>
        </View>
      </ImageBackground>
    </MainLayout>
  );
};
