import { Button, MainLayout } from '@common/components';
import { View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  CompatibilityContext,
  CompatibilityContextType,
} from '../../../../navigation/compatibilityStack';
import { useUnistyles } from 'react-native-unistyles';
import { Header } from '@common/components/Header';
import { styles } from './styles';
import { CompatibilityStackParamList } from '@common/types.ts';
import { getCompatibilityPercentage } from '@common/utils';
import { ResultView, shareResultView } from '../../components/ResultView';

export const Result = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  const imageRef = useRef<View>(null);
  const { zodiac, setZodiac } = useContext(
    CompatibilityContext,
  ) as CompatibilityContextType;

  const percentage = getCompatibilityPercentage(zodiac[0]?.id, zodiac[1]?.id);

  const handleShare = () =>
    shareResultView(
      imageRef,
      t('shareCompatibilityResult', {
        firstZodiac: t(zodiac[0]?.id ?? zodiac[0]?.name ?? ''),
        secondZodiac: t(zodiac[1]?.id ?? zodiac[1]?.name ?? ''),
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
        firstZodiacId={zodiac[0]?.id}
        secondZodiacId={zodiac[1]?.id}
        percentage={percentage}
      />
      <Button
        onPress={() => {
          setZodiac([]);
          navigation.popTo('FirstZodiac');
        }}
        style={styles.button}
      >
        {t('tryAnother')}
      </Button>
    </MainLayout>
  );
};
