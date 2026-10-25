import { Button, MainLayout } from '@common/components';
import { View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useCompatibility } from '../../context/CompatibilityContext';
import { useUnistyles } from 'react-native-unistyles';
import { Header } from '@common/components/Header';
import { styles } from './styles';
import { CompatibilityStackParamList } from '@common/types.ts';
import { getCompatibilityPercentage } from '@common/utils';
import { ResultView } from '../../components/ResultView';
import { shareResultView } from '@common/utils/shareView';

export const Result = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  const imageRef = useRef<View>(null);
  const { selection, reset } = useCompatibility();

  const percentage = getCompatibilityPercentage(
    selection.first,
    selection.second,
  );

  const handleShare = () =>
    shareResultView(
      imageRef,
      t('shareCompatibilityResult', {
        firstZodiac: t(selection.first ?? ''),
        secondZodiac: t(selection.second ?? ''),
      }),
    );

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      contentContainerStyle={styles.layout}
      header={
        <Header>
          <Header.Title>{t('compatibilityResult')}</Header.Title>
          <Header.Icon
            name='share'
            color={theme.iconPrimary}
            onPress={handleShare}
          />
        </Header>
      }
    >
      <ResultView
        ref={imageRef}
        firstZodiacId={selection.first}
        secondZodiacId={selection.second}
        percentage={percentage}
      />
      <Button
        onPress={() => {
          reset();
          navigation.popTo('FirstZodiac');
        }}
        style={styles.button}
      >
        {t('tryAnother')}
      </Button>
    </MainLayout>
  );
};
