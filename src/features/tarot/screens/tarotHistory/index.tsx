import { Header, MainLayout, Text } from '@common/components';
import { RootStackParamList } from '@common/types.ts';
import { getTarotCard, TAROT_PERIODS } from '@common/data/tarot';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  clearTarotHistory,
  removeTarotResult,
  TarotReading,
  useAppDispatch,
  useAppSelector,
} from '@store';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Image, Pressable, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { styles } from './styles';

export const readingTypeKey = (type: TarotReading['type']) =>
  type === 'one' ? 'oneCardReading' : 'threeCardReading';

export const TarotHistory = () => {
  const { theme } = useUnistyles();
  const { t, i18n } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const tarotReadingsHistory = useAppSelector(state => state.tarot.history);
  const dispatch = useAppDispatch();

  const confirmClear = () =>
    Alert.alert(t('clearAll'), t('confirmClearHistory'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('clearAll'),
        style: 'destructive',
        onPress: () => dispatch(clearTarotHistory()),
      },
    ]);

  const confirmDelete = (id: string) =>
    Alert.alert(t('delete'), t('confirmDelete'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete'),
        style: 'destructive',
        onPress: () => dispatch(removeTarotResult(id)),
      },
    ]);

  const renderItem = ({ item }: { item: TarotReading }) => {
    const cards = item.cardIds.map(getTarotCard);
    const caption =
      item.type === 'one'
        ? t(cards[0]?.meaningKey ?? getTarotCard().meaningKey)
        : TAROT_PERIODS.map(period => t(period)).join(' · ');
    return (
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate('TarotDetail', { id: item.id })}
      >
        <View style={styles.thumbnails}>
          {cards.map((card, index) => (
            <Image
              key={`${card.id}-${index}`}
              source={card.image}
              style={
                cards.length > 1 ? styles.smallThumbnail : styles.thumbnail
              }
            />
          ))}
        </View>

        <View style={styles.itemText}>
          <Text variant='label' numberOfLines={1}>
            {t(readingTypeKey(item.type))}
          </Text>
          <Text variant='caption' color='textSecondary' numberOfLines={2}>
            {caption}
          </Text>
          <Text variant='small' color='textTertiary'>
            {new Date(item.createdAt).toLocaleDateString(i18n.language, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>

        <Pressable hitSlop={8} onPress={() => confirmDelete(item.id)}>
          <Text variant='small' color='error'>
            {t('delete')}
          </Text>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <MainLayout
      edges={['top', 'right', 'left']}
      header={
        <Header>
          <Header.Icon
            name='rightArrow'
            color={theme.iconPrimary}
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Header.Title>{t('tarotHistory')}</Header.Title>
          {tarotReadingsHistory.length > 0 && (
            <Pressable hitSlop={8} onPress={confirmClear}>
              <Text variant='caption' color='error'>
                {t('clearAll')}
              </Text>
            </Pressable>
          )}
        </Header>
      }
    >
      <FlatList
        data={tarotReadingsHistory}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant='body' color='textSecondary' textAlign='center'>
              {t('noTarotReadingHistory')}
            </Text>
          </View>
        }
      />
    </MainLayout>
  );
};
