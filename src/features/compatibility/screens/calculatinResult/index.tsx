import { Text } from '@common/components';
import MainLayout from '@common/components/MainLayout';
import { ImageBackground, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appImages } from '@assets/images';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { styles } from './styles';
import { CompatibilityStackParamList } from '@common/types.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CompatibilityContext,
  CompatibilityContextType,
} from '../../../../navigation/compatibilityStack';
import { addResult, useAppDispatch } from '@store';
import { getCompatibilityPercentage } from '@common/utils';

export const CalculatingResult = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();
  const dispatch = useAppDispatch();
  const { zodiac } = useContext(
    CompatibilityContext,
  ) as CompatibilityContextType;
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const [first, second] = zodiac;
      if (first?.id && second?.id) {
        dispatch(
          addResult({
            firstZodiacId: first.id,
            secondZodiacId: second.id,
            percentage: getCompatibilityPercentage(first.id, second.id),
          }),
        );
      }
      navigation.navigate('Result');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [navigation, zodiac, dispatch]);

  return (
    <MainLayout
      statusBarTranslucent={true}
      style={styles.layout}
      edges={['top', 'right', 'left']}
    >
      <ImageBackground
        source={appImages.zodiac}
        resizeMode='cover'
        style={styles.background}
      >
        <View style={styles.content}>
          <Text variant='heading2'>
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
