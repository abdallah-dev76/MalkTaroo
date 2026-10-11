import { MainLayout, ZodiacCard } from '@common/components';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompatibilityStackParamList } from '@common/types.ts';
import { zodiacList } from '@common/data/zodiac';
import { Header } from '@common/components/Header';
import { FlatList, Pressable } from 'react-native';
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
  selectedZodiacId,
}: {
  title: string;
  onCardPress: (item: ZodiacCardProps) => void;
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
              name='rightArrow'
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
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() => onCardPress(item)}
            style={styles.item}
            accessibilityRole='button'
            accessibilityState={{ selected: item.id === selectedZodiacId }}
            accessibilityLabel={`${item.name}, ${item.date}`}
          >
            <ZodiacCard item={item} IsSelected={item.id === selectedZodiacId} />
          </Pressable>
        )}
      />
    </MainLayout>
  );
};
