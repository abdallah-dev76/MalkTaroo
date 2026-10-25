import { Button, Text, MainLayout, Header } from '@common/components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useUnistyles } from 'react-native-unistyles';
import { Animated, View } from 'react-native';
import type { Image } from 'react-native';
import { appImages } from '@assets/images';
import { getTarotCard } from '@common/data/tarot';
import { useOneCardReading } from '../../hooks/useOneCardReading';
import { useReadingShare } from '../../hooks/useReadingShare';
import {
  CARD_LIFT_OFFSET,
  getCardAnimationStyle,
  getOpacityStyle,
  styles,
} from './styles';
import { getArrowDirection } from '@common/utils/getArrowDirection';

export const OneCardReading = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useUnistyles();
  const {
    cardId,
    isRevealed,
    isAnimating,
    buttonOpacity,
    resultOpacity,
    headingOpacity,
    cardScaleX,
    cardTranslateY,
    cardScale,
    handleChooseCard,
    handleTryAnotherCard,
  } = useOneCardReading(CARD_LIFT_OFFSET);
  const { captureTarget, share, isSharing } = useReadingShare<Image>(
    'one',
    cardId ? [cardId] : [],
    isRevealed && !isAnimating,
  );
  const drawnCard = getTarotCard(cardId);
  const cardImage = isRevealed ? drawnCard.image : appImages.tarotCard;

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
        <Animated.View
          style={[
            styles.heading(isRevealed && !isAnimating),
            getOpacityStyle(headingOpacity),
          ]}
        >
          <Text variant='heading1' color={theme.textGold} textAlign='center'>
            {t('focusOnYourQuestion')}
          </Text>
          <Text variant='body' textAlign='center'>
            {t('focusOnYourQuestionDescription')}
          </Text>
        </Animated.View>

        <View style={styles.cardContainer}>
          <View
            style={[
              styles.cardFrame,
              isRevealed && styles.revealedCardFrame,
            ]}
          >
            <Animated.Image
              ref={captureTarget}
              source={cardImage}
              style={[
                styles.tarotCard(isRevealed),
                getCardAnimationStyle(cardTranslateY, cardScale, cardScaleX),
              ]}
              resizeMode='contain'
            />
          </View>
        </View>

        <Animated.View
          pointerEvents={isAnimating ? 'none' : 'auto'}
          style={styles.buttonWrapper}
        >
          {isRevealed ? (
            <Animated.View
              style={[styles.resultContent, getOpacityStyle(resultOpacity)]}
            >
              <View style={styles.resultBox}>
                <Text
                  variant='body'
                  color={theme.textPrimary}
                  textAlign='center'
                >
                  {t(drawnCard.meaningKey)}
                </Text>
              </View>
              <Button
                variant='outline'
                fullWidth
                onPress={handleTryAnotherCard}
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
                onPress={handleChooseCard}
              >
                {t('chooseYourCard')}
              </Button>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </MainLayout>
  );
};
