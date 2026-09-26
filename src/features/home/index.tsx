import { MainLayout, Text, Header, Button, Icon } from '@common/components';
import { View, ImageBackground } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { appImages } from '@assets/images';
import { IconName } from '@assets/icons';
import { radius, spacing } from '@theme/index';

const gridItems: { icon: IconName; titleKey: string; subtitleKey: string }[] = [
  { icon: 'cards', titleKey: 'tarot', subtitleKey: 'tarotDescription' },
  { icon: 'heart', titleKey: 'compatibility', subtitleKey: 'startDescription' },
  { icon: 'profile', titleKey: 'zodiac', subtitleKey: 'zodiacDescription' },
  { icon: 'home', titleKey: 'profile', subtitleKey: 'profileDescription' },
];

export const Home = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      header={
        <Header>
          <Header.Hello>{t('goodMorning')} Malak!</Header.Hello>
          <Header.Icon
            name='heart'
            onPress={() => {}}
            color={theme.iconPrimary}
            size={24}
          />
        </Header>
      }
      contentContainerStyle={{ marginVertical: 24, gap: 24 }}
    >
      <View style={{ height: '30%' }}>
        <ImageBackground
          source={appImages.dailyMessage}
          resizeMode='cover'
          style={{
            gap: 16,
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.borderGold,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              padding: 16,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <View style={{ gap: 6, flex: 1 }}>
              <Text variant='title'>{t('zodiacMessage')}</Text>
              <Text variant='label' color='textSecondary' numberOfLines={2}>
                {t('randomText')}
              </Text>
            </View>

            <Button variant='premium' size='small'>
              {t('readNow')}
            </Button>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: spacing.md,
          marginTop: 24,
          width: '100%',
        }}
      >
        {gridItems.map(item => (
          <View
            key={item.titleKey}
            style={{
              width: '47%',
              aspectRatio: 1,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.backgroundElevated,
              padding: spacing.md,
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.xs,
            }}
          >
            <Icon name={item.icon} size={28} color={theme.iconActive} />
            <Text variant='label' color='textPrimary' textAlign='center'>
              {t(item.titleKey)}
            </Text>
            <Text
              variant='caption'
              color='textSecondary'
              textAlign='center'
              numberOfLines={2}
            >
              {t(item.subtitleKey)}
            </Text>
          </View>
        ))}
      </View>
    </MainLayout>
  );
};
