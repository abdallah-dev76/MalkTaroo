import { Icon, Text } from '@common/components';
import { View } from 'react-native';
import { IconName } from '@assets/icons';
import { Colors } from '@theme/theme';
import { useUnistyles } from 'react-native-unistyles';
import { LUCK_ICON_SIZE, styles } from './styles';

type LuckCardProps = {
  title: string;
  score: number;
  icon: IconName;
  color: Colors;
  compact?: boolean;
};

export const LuckCard = ({
  icon,
  title,
  score,
  color,
  compact = false,
}: LuckCardProps) => {
  const { theme } = useUnistyles();
  const safeScore = Number.isFinite(score)
    ? Math.min(10, Math.max(1, Math.round(score)))
    : 1;

  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <Icon name={icon} size={LUCK_ICON_SIZE} color={theme[color]} isFocused />
      <View>
        <Text
          variant='caption'
          color='textGold'
          style={styles.neonText(color)}
          numberOfLines={compact ? 2 : 1}
          textAlign='center'
        >
          {title}
        </Text>
        <Text
          variant='caption'
          color='textGold'
          style={styles.neonText(color)}
          numberOfLines={1}
          textAlign='center'
        >
          {safeScore}/10
        </Text>
      </View>
      <View
        accessibilityRole='progressbar'
        accessibilityLabel={title}
        accessibilityValue={{ min: 1, max: 10, now: safeScore }}
        style={styles.progressTrack(color)}
      >
        <View style={styles.progressFill(color, safeScore)} />
      </View>
    </View>
  );
};
