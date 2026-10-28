import { FlatList } from 'react-native';
import { getArrowDirection } from '@common/utils/getArrowDirection';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { Header, MainLayout } from '@common/components';
import type { RootStackParamList } from '@common/types.ts';
import { tarotCards } from '@common/data/tarot';
import { zodiacList } from '@common/data/zodiac';
import { TarotCard } from '../../components/tarotCard';
import { ZodiacListItem } from '../../components/zodiacListItem';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'LearningList'>;

export const LearningList = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const isTarot = route.params.type === 'tarot';

  return (
    <MainLayout
      header={
        <Header>
          <Header.Icon
            name={getArrowDirection('rightArrow')}
            color={theme.iconPrimary}
            onPress={() => navigation.goBack()}
          />
          <Header.Title>
            {t(isTarot ? 'learnTarot' : 'learnZodiac')}
          </Header.Title>
        </Header>
      }
    >
      {isTarot ? (
        <FlatList
          data={tarotCards}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TarotCard
              id={item.id}
              image={item.image}
              title={item.nameEn}
              description={t(item.shortDescription)}
              cardLabel={item.nameAr}
              learnMoreLabel={t('learnMore')}
              style={styles.card}
            />
          )}
        />
      ) : (
        <FlatList
          data={zodiacList}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ZodiacListItem
              image={item.image}
              title={t(item.id)}
              dateRange={t(`dates.${item.id}`)}
              id={item.id}
            />
          )}
        />
      )}
    </MainLayout>
  );
};
