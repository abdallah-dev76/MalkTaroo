import {
  Button,
  Icon,
  MainLayout,
  Text,
  CompatibilityCircle,
} from '@common/components';
import { Animated, Share, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  CompatibilityContext,
  CompatibilityContextType,
} from '../../../../navigation/compatibilityStack';
import Avatar from '@common/components/Avatar';
import { useUnistyles } from 'react-native-unistyles';
import { Header } from '@common/components/Header';
import { captureRef } from 'react-native-view-shot';
import { styles } from './styles';
import { CompatibilityStackParamList } from '@common/types.ts';

export const Result = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  const { zodiac } = useContext(
    CompatibilityContext,
  ) as CompatibilityContextType;

  const imageRef = useRef<View>(null);
  const handleShare = async () => {
    if (!imageRef.current) {
      return;
    }

    try {
      const imageUrl = await captureRef(imageRef.current, {
        format: 'png',
        quality: 1,
      });
      await Share.share({
        url: imageUrl,
        message: `Check out the compatibility result for ${zodiac[0]?.name} and ${zodiac[1]?.name}!`,
      });
    } catch {}
  };

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

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
            size={24}
            onPress={handleShare}
          />
        </Header>
      }
    >
      <View ref={imageRef} collapsable={false} style={styles.content}>
        <View style={styles.zodiacRow}>
          {zodiac.map((zodiacData, index) => (
            <View key={index} style={styles.zodiacItem}>
              <Avatar source={zodiacData?.image} size='xLarge' isBorder />
              <Text variant='heading3'>{zodiacData?.name}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.heartWrapper}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Icon name='heart' color={theme.borderGold} size={28} isFocused />
            </Animated.View>
          </View>
        </View>
        <View style={styles.compatibilityWrapper}>
          <CompatibilityCircle percentage={79} />
        </View>
        <View style={styles.descriptionBox}>
          <Text textAlign='center' variant='body'>
            {t('randomText')}
          </Text>
        </View>
      </View>
      <Button onPress={() => navigation.navigate('FirstZodiac')}>
        {t('tryAnother')}
      </Button>
    </MainLayout>
  );
};
