import { MainLayout, ZodiacCard } from '@common/components';
import { useNavigation } from '@react-navigation/native';
import { getArrowDirection } from '@common/utils/getArrowDirection';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompatibilityStackParamList } from '@common/types.ts';
import { ZodiacProps, zodiacList } from '@common/data/zodiac';
import { Header } from '@common/components/Header';
import { FlatList, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { styles } from './styles';
import { isArabic } from '@common/utils/appSettings';

export enum ZodiacId {
  FirstZodiac = 'firstZodiac',
  SecondZodiac = 'secondZodiac',
}

export const ChooseZodiac = ({
  title,
  onCardPress,
  id,
  selectedZodiacId,
}: {
  title: string;
  onCardPress: (item: ZodiacProps) => void;
  id: string;
  selectedZodiacId?: string;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <MainLayout
      edges={['top', 'right', 'left']}
      header={
        <Header>
          {id !== ZodiacId.FirstZodiac && (
            <Header.Icon
              name={getArrowDirection('rightArrow')}
              color={theme.iconPrimary}
              onPress={() => navigation.goBack()}
            />
          )}
          <Header.Title>{t(title)}</Header.Title>
        </Header>
      }
      style={styles.container}
    >
      <FlatList
        data={zodiacList}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: ZodiacProps }) => (
          <Pressable
            key={item.id}
            onPress={() => onCardPress(item)}
            style={styles.item}
            accessibilityRole='button'
            accessibilityState={{ selected: item.id === selectedZodiacId }}
            accessibilityLabel={`${isArabic ? item.nameAr : item.nameEn}, ${
              item.dateRange
            }`}
          >
            <ZodiacCard item={item} IsSelected={item.id === selectedZodiacId} />
          </Pressable>
        )}
      />
    </MainLayout>
  );
};
