import { appImages } from '@assets/images';
import { Button, MainLayout, Text } from '@common/components';
import { useUnistyles } from 'react-native-unistyles';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageBackground, View, Dimensions } from 'react-native';
import { CompatibilityStackParamList } from '@common/types.ts';
import { styles } from './styles';
import { Storage, StorageKeys } from '@common/storage';

export const Start = () => {
  const { t } = useTranslation();
  const { rt } = useUnistyles();

  const themeName = rt.themeName;

  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  useEffect(() => {
    Storage.setBoolean(StorageKeys.IS_FIRST_COMPATIBILITY_DONE, true);
  }, []);

  const handleStartNow = () => {
    navigation.navigate('FirstZodiac');
  };

  return (
    <MainLayout
      statusBarTranslucent
      style={styles.layout}
      edges={['top', 'right', 'left']}
    >
      <ImageBackground
        source={
          themeName === 'light' ? appImages.couplesLight : appImages.couples
        }
        resizeMode='cover'
        style={styles.background}
      >
        <View style={styles.content(Dimensions.get('window').height / 2)}>
          <Text variant='heading1' color='textGold'>
            {t('compatibility')}
          </Text>
          <Text variant='heading3' textAlign='center'>
            {t('startDescription')}
          </Text>
          <Button onPress={handleStartNow} style={styles.button} fullWidth>
            {t('startNow')}
          </Button>
        </View>
      </ImageBackground>
    </MainLayout>
  );
};
