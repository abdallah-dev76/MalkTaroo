import { Alert, FlatList, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { Header, MainLayout, Text } from '@common/components';
import Avatar from '@common/components/Avatar';
import { getCompatibilityLabelKey } from '@common/utils';
import { RootStackParamList } from '@common/types.ts';
import { appImages } from '@assets/images';
import {
  clearHistory,
  CompatibilityRecord,
  removeResult,
  useAppDispatch,
  useAppSelector,
} from '../../../../store';
import { styles } from './styles';

const zodiacImage = (id: string) => appImages[id as keyof typeof appImages];

export const CompatibilityHistory = () => {
  const { theme } = useUnistyles();
  const { t, i18n } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const history = useAppSelector(state => state.compatibility.history);

  const confirmClear = () =>
    Alert.alert(t('clearAll'), t('confirmClearHistory'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('clearAll'),
        style: 'destructive',
        onPress: () => dispatch(clearHistory()),
      },
    ]);

  const confirmDelete = (id: string) =>
    Alert.alert(t('delete'), t('confirmDelete'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete'),
        style: 'destructive',
        onPress: () => dispatch(removeResult(id)),
      },
    ]);

  const renderItem = ({ item }: { item: CompatibilityRecord }) => (
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate('CompatibilityDetail', { id: item.id })
      }
    >
      <View style={styles.avatars}>
        <Avatar
          source={zodiacImage(item.firstZodiacId)}
          size='small'
          isBorder
        />
        <Avatar
          source={zodiacImage(item.secondZodiacId)}
          size='small'
          isBorder
        />
      </View>

      <View style={styles.itemText}>
        <Text variant='label' numberOfLines={1}>
          {t(item.firstZodiacId)} & {t(item.secondZodiacId)}
        </Text>
        <Text variant='caption' color='textSecondary' numberOfLines={1}>
          {t(getCompatibilityLabelKey(item.percentage))}
        </Text>
        <Text variant='small' color='textTertiary'>
          {new Date(item.createdAt).toLocaleDateString(i18n.language, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.itemEnd}>
        <Text variant='heading3' color='textGold'>
          {item.percentage}%
        </Text>
        <Pressable hitSlop={8} onPress={() => confirmDelete(item.id)}>
          <Text variant='small' color='error'>
            {t('delete')}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );

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
          <Header.Title>{t('compatibilityHistory')}</Header.Title>
          {history.length > 0 && (
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
        data={history}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant='body' color='textSecondary' textAlign='center'>
              {t('noCompatibilityHistory')}
            </Text>
          </View>
        }
      />
    </MainLayout>
  );
};
