import { appImages } from '@assets/images';
import { Button, MainLayout, Text } from '@common/components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageBackground, View, Dimensions } from 'react-native';
import { CompatibilityStackParamList } from '@common/types.ts';
import { contentStyle, styles } from './styles';

export const Start = () => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  const handleStartNow = () => {
    navigation.navigate('FirstZodiac');
  };

  return (
    <MainLayout
      statusBarTranslucent={true}
      style={styles.layout}
      edges={['top', 'right', 'left']}
    >
      <ImageBackground
        source={appImages.couples}
        resizeMode='cover'
        style={styles.background}
      >
        <View style={contentStyle(Dimensions.get('window').height / 2)}>
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
