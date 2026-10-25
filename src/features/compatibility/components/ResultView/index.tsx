import { Ref, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { CompatibilityCircle, Icon, Text } from '@common/components';
import Avatar from '@common/components/Avatar';
import { appImages } from '@assets/images';
import { getPulseStyle, HEART_ICON_SIZE, styles } from './styles';

type Props = {
  firstZodiacId?: string;
  secondZodiacId?: string;
  percentage: number;
  ref?: Ref<View>;
};

export const ResultView = ({
  firstZodiacId,
  secondZodiacId,
  percentage,
  ref,
}: Props) => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
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
    <View ref={ref} collapsable={false} style={styles.content}>
      <View style={styles.zodiacRow}>
        {[firstZodiacId, secondZodiacId].map((id, index) => (
          <View key={index} style={styles.zodiacItem}>
            <Avatar
              source={id ? appImages[id as keyof typeof appImages] : undefined}
              size='xLarge'
              isBorder
            />
            <View style={styles.zodiacData}>
              <Text variant='title'>{id ? t(id) : ''}</Text>
              <Text variant='caption' color='textSecondary'>
                {id ? t(`dates.${id}`) : ''}
              </Text>
            </View>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.heartWrapper}>
          <Animated.View style={getPulseStyle(pulseAnim)}>
            <Icon
              name='heartSolid'
              color={theme.borderGold}
              size={HEART_ICON_SIZE}
              isFocused
            />
          </Animated.View>
        </View>
      </View>
      <View style={styles.compatibilityWrapper}>
        <CompatibilityCircle percentage={percentage} />
      </View>
      <View style={styles.descriptionBox}>
        <Text textAlign='center' variant='body'>
          {t('randomText')}
        </Text>
      </View>
    </View>
  );
};
