import { Icon, Text } from '@common/components';
import { View } from 'react-native';
import { IconName } from '@assets/icons';
import { Colors } from '@theme/theme';
import { useUnistyles } from 'react-native-unistyles';
import { styles } from './styles';

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
      <Icon name={icon} size={28} color={theme[color]} isFocused />
      <View>
        <Text
          variant='caption'
          color='textGold'
          style={[styles.neonText, { shadowColor: theme[color] }]}
          numberOfLines={compact ? 2 : 1}
          textAlign='center'
        >
          {title}
        </Text>
        <Text
          variant='caption'
          color='textGold'
          style={[styles.neonText, { shadowColor: theme[color] }]}
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
        style={[styles.progressTrack, { borderColor: theme[color] }]}
      >
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: theme[color],
              shadowColor: theme[color],
              width: `${(safeScore / 10) * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  );
};
