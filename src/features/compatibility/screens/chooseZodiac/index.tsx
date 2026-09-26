import { MainLayout, ZodiacCard } from '@common/components';
import { useNavigation } from '@react-navigation/native';
import { zodiacList } from '@common/data/zodiac';
import { Header } from '@common/components/Header';
import { FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { styles } from './styles';
import { ZodiacCardProps } from '@common/components/ZodiacCard/types';

export enum ZodiacId {
  FirstZodiac = 'firstZodiac',
  SecondZodiac = 'secondZodiac',
}

export const ChooseZodiac = ({
  title,
  onCardPress,
  id,
}: {
  title: string;
  onCardPress: (item: ZodiacCardProps) => void;
  id: string;
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <MainLayout
      edges={['top', 'right', 'left']}
      header={
        <Header>
          {id !== ZodiacId.FirstZodiac && (
            <Header.Icon
              name='rightArrow'
              color={theme.iconPrimary}
              size={24}
              onPress={() => navigation.goBack()}
            />
          )}
          <Header.Title>{t(title)}</Header.Title>
        </Header>
      }
    >
      <FlatList
        keyExtractor={item => item.id}
        data={zodiacList}
        contentContainerStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        style={{}}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onCardPress(item)}
            style={[
              styles.item,
              index !== zodiacList.length - 1 && styles.itemBorder,
            ]}
          >
            <ZodiacCard
              image={item.image}
              name={item.name}
              date={item.date}
              id={item.id}
            />
          </TouchableOpacity>
        )}
      />
    </MainLayout>
  );
};
