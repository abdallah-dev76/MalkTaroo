import { useNavigation } from '@react-navigation/native';
import { ReadingTypeCard } from '../../components/readingTypeCard';
import { Header, MainLayout, Text } from '@common/components';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { View } from 'react-native';
import { appImages } from '@assets/images';
import { styles } from './styles';
import { TarotStackParamList } from '@common/types.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const ReadingType = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TarotStackParamList>>();
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      header={
        <Header>
          <Header.Title>{t('readingType')}</Header.Title>
        </Header>
      }
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.heading}>
        <Text variant='heading1' color={theme.textGold}>
          {t('chooseReadingType')}
        </Text>
        <Text variant='body'>{t('chooseTheWayThatSuitsYou')}</Text>
      </View>
      <View style={styles.cards}>
        <ReadingTypeCard
          title={t('oneCardReading')}
          subTitle={t('oneCardReadingDescription')}
          image={appImages.tarot}
          onPress={() => navigation.navigate('OneCardReading')}
        />
        <ReadingTypeCard
          title={t('threeCardReading')}
          subTitle={t('threeCardReadingDescription')}
          image={appImages.tarot}
          onPress={() => navigation.navigate('ThreeCardReading')}
        />
      </View>
    </MainLayout>
  );
};
