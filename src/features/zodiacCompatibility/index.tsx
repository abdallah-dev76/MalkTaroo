import { MainLayout, ZodiacCard } from '@common/components';
import { useNavigation } from '@react-navigation/native';
import { zodiacList } from '@common/data/zodiac';
import { Header } from '@common/components/Header';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { styles } from './styles';

export const ZodiacCompatibility = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  return (
    <MainLayout
      header={
        <Header>
          <Header.Icon
            name='rightArrow'
            color={theme.iconPrimary}
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Header.Title>{t('zodiaccompatibility')}</Header.Title>
        </Header>
      }
    >
      <FlatList
        keyExtractor={item => item.id}
        data={zodiacList}
        numColumns={4}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ZodiacCard
            image={item.image}
            name={item.name}
            duration={item.date}
          />
        )}
      />
    </MainLayout>
  );
};
