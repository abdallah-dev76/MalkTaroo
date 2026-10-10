import { MainLayout, Text, Header, Button } from '@common/components';
import { View, ImageBackground, FlatList } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { appImages } from '@assets/images';
import { styles } from './styles';
import { TarotCard } from '../../components/tarotCard';
import { ZodiacCard } from '../../components/zodiacCard';

const tarotCards = [
  {
    id: '1',
    titleKey: 'tarotCardTitle1',
    descriptionKey: 'tarotCardDescription1',
    image: appImages.tarotCard,
  },
  {
    id: '2',
    titleKey: 'tarotCardTitle2',
    descriptionKey: 'tarotCardDescription2',
    image: appImages.tarotCard,
  },
  {
    id: '3',
    titleKey: 'tarotCardTitle3',
    descriptionKey: 'tarotCardDescription3',
    image: appImages.tarotCard,
  },
];

const zodiacCards = [
  { id: 'aries', image: appImages.aries },
  { id: 'taurus', image: appImages.taurus },
  { id: 'gemini', image: appImages.gemini },
  { id: 'cancer', image: appImages.cancer },
  { id: 'leo', image: appImages.leo },
  { id: 'virgo', image: appImages.virgo },
  { id: 'libra', image: appImages.libra },
  { id: 'scorpio', image: appImages.scorpio },
  { id: 'sagittarius', image: appImages.sagittarius },
  { id: 'capricorn', image: appImages.capricorn },
  { id: 'aquarius', image: appImages.aquarius },
  { id: 'pisces', image: appImages.pisces },
];

export const Home = () => {
  const { theme, rt } = useUnistyles();
  const themeName = rt.themeName;
  const { t } = useTranslation();

  return (
    <MainLayout
      scrollable
      edges={['top', 'right', 'left']}
      header={
        <Header>
          <Header.Hello>{t('goodMorning')} Malak!</Header.Hello>
          <Header.Icon
            name='notification'
            onPress={() => {}}
            color={theme.iconPrimary}
            size={24}
          />
        </Header>
      }
      contentContainerStyle={styles.content}
    >
      <View>
        <ImageBackground
          source={
            themeName === 'light'
              ? appImages.dailyMessageLight
              : appImages.dailyMessage
          }
          resizeMode='cover'
          style={styles.dailyMessage}
        >
          <View
            style={[
              styles.dailyOverlay,
              themeName === 'light' ? styles.lightOverlay : styles.darkOverlay,
            ]}
          />
          <View style={styles.dailyContent}>
            <View style={styles.dailyText}>
              <Text variant='title'>{t('zodiacMessage')}</Text>
              <Text variant='label' color='textSecondary' numberOfLines={2}>
                {t('randomText')}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant='heading3'>{t('learnTarot')}</Text>
          <Button variant='ghost'>{t('showMore')}</Button>
        </View>
        <FlatList
          data={tarotCards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TarotCard
              image={item.image}
              title={t(item.titleKey)}
              description={t(item.descriptionKey)}
              cardLabel={t('tarotCardLabel')}
              learnMoreLabel={t('learnMore')}
            />
          )}
          horizontal
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant='heading3'>{t('learnZodiac')}</Text>
          <Button variant='ghost'>{t('showMore')}</Button>
        </View>
        <FlatList
          data={zodiacCards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ZodiacCard
              image={item.image}
              title={t(item.id)}
              dateRange={t(`dates.${item.id}`)}
            />
          )}
          horizontal
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </MainLayout>
  );
};
