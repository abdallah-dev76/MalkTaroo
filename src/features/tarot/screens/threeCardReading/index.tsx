import { Button, Text, MainLayout, Header } from '@common/components';
import { getArrowDirection } from '@common/utils/getArrowDirection';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useUnistyles } from 'react-native-unistyles';
import { Animated, View } from 'react-native';
import { appImages } from '@assets/images';
import {
  getPeriodMeaningKey,
  getTarotCard,
  TAROT_PERIODS,
} from '@common/data/tarot';
import { useThreeCardReading } from '../../hooks/useThreeCardReading';
import { useReadingShare } from '../../hooks/useReadingShare';
import { getCardAnimationStyle, getOpacityStyle, styles } from './styles';

export const ThreeCardReading = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useUnistyles();
  const {
    cardIds,
    isRevealed,
    isAnimating,
    flipProgress,
    buttonOpacity,
    resultOpacity,
    handleRevealCards,
    handleTryAnotherReading,
  } = useThreeCardReading();
  const { captureTarget, share, isSharing } = useReadingShare<View>(
    'three',
    cardIds,
    isRevealed && !isAnimating,
  );

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      header={
        <Header>
          <Header.Icon
            name={getArrowDirection('rightArrow')}
            color={theme.iconPrimary}
            onPress={() => navigation.goBack()}
          />
        </Header>
      }
    >
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text variant='heading1' color={theme.textGold} textAlign='center'>
            {t('threeCardHeading')}
          </Text>
          <Text variant='body' textAlign='center'>
            {t('threeCardHeadingDescription')}
          </Text>
        </View>

        <View ref={captureTarget} collapsable={false} style={styles.cards}>
          {TAROT_PERIODS.map((period, index) => {
            const card = getTarotCard(cardIds[index]);
            return (
              <View key={period} style={styles.cardColumn}>
                <Animated.Image
                  source={isRevealed ? card.image : appImages.tarotCard}
                  style={[
                    styles.tarotCard,
                    getCardAnimationStyle(flipProgress),
                  ]}
                  resizeMode='contain'
                />
                <Text variant='label' color={theme.textGold} textAlign='center'>
                  {t(period)}
                </Text>
                {isRevealed && (
                  <Animated.View
                    style={[styles.cardReading, getOpacityStyle(resultOpacity)]}
                  >
                    <Text
                      variant='caption'
                      color={theme.textPrimary}
                      textAlign='center'
                    >
                      {t(getPeriodMeaningKey(card, period))}
                    </Text>
                  </Animated.View>
                )}
              </View>
            );
          })}
        </View>

        <View
          pointerEvents={isAnimating ? 'none' : 'auto'}
          style={styles.buttonWrapper}
        >
          {isRevealed ? (
            <Animated.View
              style={[styles.resultContent, getOpacityStyle(resultOpacity)]}
            >
              <Button
                variant='outline'
                fullWidth
                onPress={handleTryAnotherReading}
                disabled={isSharing}
              >
                {t('tryAnotherReading')}
              </Button>
              <Button
                variant='premium'
                fullWidth
                onPress={share}
                loading={isSharing}
                disabled={isAnimating}
              >
                {t('share')}
              </Button>
            </Animated.View>
          ) : (
            <Animated.View style={getOpacityStyle(buttonOpacity)}>
              <Button
                variant='premium'
                fullWidth
                disabled={isAnimating}
                onPress={handleRevealCards}
              >
                {t('revealCards')}
              </Button>
            </Animated.View>
          )}
        </View>
      </View>
    </MainLayout>
  );
};
