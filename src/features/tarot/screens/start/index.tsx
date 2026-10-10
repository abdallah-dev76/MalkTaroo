import { appImages } from '@assets/images';
import { Button, MainLayout, Text } from '@common/components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageBackground, View, Dimensions } from 'react-native';
import { TarotStackParamList } from '@common/types.ts';
import { styles } from './styles';
import { useUnistyles } from 'react-native-unistyles';
import { useEffect } from 'react';
import { StorageKeys } from '@common/storage/enum';
import { Storage } from '@common/storage/storage';

export const Start = () => {
  const { t } = useTranslation();
  const { rt } = useUnistyles();
  const themeName = rt.themeName;

  const navigation =
    useNavigation<NativeStackNavigationProp<TarotStackParamList>>();

  const handleStartNow = () => {
    navigation.navigate('ReadingType');
  };

  useEffect(() => {
    Storage.setBoolean(StorageKeys.IS_FRIST_READING_DONE, true);
  }, []);

  return (
    <MainLayout
      statusBarTranslucent={true}
      style={styles.layout}
      edges={['top', 'right', 'left']}
    >
      <ImageBackground
        source={themeName === 'light' ? appImages.tarotLight : appImages.tarot}
        resizeMode='cover'
        style={styles.background}
      >
        <View style={styles.contentStyle(Dimensions.get('window').height / 2)}>
          <Text variant='heading1' color='textGold'>
            {t('tarot')}
          </Text>
          <Text variant='heading3' textAlign='center'>
            {t('tarotDescription')}
          </Text>
          <Button onPress={handleStartNow} style={styles.button} fullWidth>
            {t('startNow')}
          </Button>
        </View>
      </ImageBackground>
    </MainLayout>
  );
};
