import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Text from '../Text';
import { useUnistyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { getCompatibilityLabelKey } from '@common/utils/compatibility';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  duration?: number;
  /** Overrides the default label derived from the percentage bucket. */
  label?: string;
};

export const CompatibilityCircle = ({
  percentage,
  size = 180,
  strokeWidth = 12,
  duration = 1200,
  label,
}: Props) => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedPercentage = useRef(new Animated.Value(0)).current;
  const labelOpacity = useRef(new Animated.Value(0)).current;
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    animatedPercentage.setValue(0);
    labelOpacity.setValue(0);
    setDisplayPercentage(0);

    const listenerId = animatedPercentage.addListener(({ value }) => {
      setDisplayPercentage(Math.round(value));
    });

    Animated.timing(animatedPercentage, {
      toValue: percentage,
      duration,
      useNativeDriver: false,
    }).start();

    Animated.timing(labelOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    return () => animatedPercentage.removeListener(listenerId);
  }, [percentage, duration, animatedPercentage, labelOpacity]);

  const strokeDashoffset = animatedPercentage.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  const resolvedLabel = label ?? t(getCompatibilityLabelKey(percentage));

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg
        width={size}
        height={size}
        style={{
          position: 'absolute',
          transform: [{ rotate: '-90deg' }],
        }}
      >
        {/* background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.border}
          strokeWidth={strokeWidth}
          fill='none'
        />

        {/* progress */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.borderGold}
          strokeWidth={strokeWidth}
          fill='none'
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Animated.View style={{ opacity: labelOpacity }}>
        <Text variant='heading1'>{displayPercentage}%</Text>

        <Text variant='caption'>{resolvedLabel}</Text>
      </Animated.View>
    </View>
  );
};
