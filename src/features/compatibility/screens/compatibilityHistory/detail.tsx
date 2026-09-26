import { useRef } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { Header, MainLayout, Text } from '@common/components';
import { RootStackParamList } from '@common/types.ts';
import {
  ResultView,
  shareResultView,
} from '@features/compatibility/components/ResultView';
import { useAppSelector } from '../../../../store';
import { styles } from './styles';

export const CompatibilityDetail = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id } =
    useRoute<RouteProp<RootStackParamList, 'CompatibilityDetail'>>().params;
  const record = useAppSelector(state =>
    state.compatibility.history.find(item => item.id === id),
  );
  const imageRef = useRef<View>(null);

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      contentContainerStyle={styles.detail}
      header={
        <Header>
          <Header.Icon
            name='rightArrow'
            color={theme.iconPrimary}
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Header.Title>{t('compatibilityResult')}</Header.Title>
          {record && (
            <Header.Icon
              name='share'
              color={theme.iconPrimary}
              size={24}
              onPress={() =>
                shareResultView(
                  imageRef,
                  `Check out the compatibility result for ${t(
                    record.firstZodiacId,
                  )} and ${t(record.secondZodiacId)}!`,
                )
              }
            />
          )}
        </Header>
      }
    >
      {record ? (
        <ResultView
          ref={imageRef}
          firstZodiacId={record.firstZodiacId}
          secondZodiacId={record.secondZodiacId}
          percentage={record.percentage}
        />
      ) : (
        <Text variant='body' color='textSecondary' textAlign='center'>
          {t('noCompatibilityHistory')}
        </Text>
      )}
    </MainLayout>
  );
};
