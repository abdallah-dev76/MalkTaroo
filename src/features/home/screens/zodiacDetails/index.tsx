import { Header } from '@common/components/Header';
import { MainLayout } from '@common/components/MainLayout';
import { getArrowDirection } from '@common/utils/getArrowDirection';
import { Image, Pressable, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { PropsWithChildren } from 'react';
import type { IconName } from '@assets/icons';
import type { RootStackParamList } from '@common/types.ts';
import { styles } from './styles';
import { Icon, Text } from '@common/components';
import { zodiacList } from '@common/data/zodiac';
import { isArabic } from '@common/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'ZodiacDetails'>;
type Tone = 'gold' | 'success' | 'error';

const Section = ({
  title,
  icon,
  tone = 'gold',
  children,
}: PropsWithChildren<{ title: string; icon: IconName; tone?: Tone }>) => {
  const { theme } = useUnistyles();
  const color = tone === 'gold' ? theme.textGold : theme[tone];

  return (
    <View style={styles.section(tone)}>
      <View style={styles.sectionHeading}>
        <View style={styles.icon}>
          <Icon name={icon} color={color} />
        </View>

        <Text variant='bodyMedium' color={color} style={styles.sectionTitle}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
};

export const ZodiacDetails = ({ route, navigation }: Props) => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const { id } = route.params;

  const zodiac = zodiacList.find(item => item.id === id);
  const zodiacName = isArabic ? zodiac?.nameAr : zodiac?.nameEn;

  return (
    <MainLayout
      scrollable
      header={
        <Header>
          <Header.Icon
            name={getArrowDirection('rightArrow')}
            color={theme.iconPrimary}
            onPress={() => navigation.goBack()}
          />
          <Header.Title>{t('learnZodiac')}</Header.Title>
        </Header>
      }
      contentContainerStyle={styles.container}
    >
      {!zodiac ? (
        <Text textAlign='center'>{t('zodiacLearning.notFound')}</Text>
      ) : (
        <>
          <View style={[styles.box, styles.zodiacData]}>
            <Image
              source={zodiac.image}
              style={styles.heroImage}
              resizeMode='contain'
            />
            <View style={styles.heroContent}>
              <Text variant='heading2' color='textGold'>
                {zodiac.nameAr}
              </Text>
              <Text variant='heading2' color='textGold'>
                {zodiac.nameEn}
              </Text>
              <Text variant='label' color='textSecondary'>
                {zodiac.dateRange}
              </Text>
              <View style={styles.tags}>
                <View style={styles.tag}>
                  <Text variant='caption' color='textPrimary'>
                    {t('element')}
                  </Text>
                  <Text
                    variant='caption'
                    color='textGold'
                    textAlign='center'
                    style={styles.bold}
                  >
                    {zodiac.element}
                  </Text>
                </View>
                <View style={styles.tag}>
                  <Text variant='caption' color='textPrimary'>
                    {t('rulingPlanet')}
                  </Text>
                  <Text
                    variant='caption'
                    color='textGold'
                    textAlign='center'
                    style={styles.bold}
                  >
                    {zodiac.rulingPlanet}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Section
            title={t('zodiacLearning.about', {
              sign: zodiacName,
            })}
            icon='star'
          >
            <Text variant='label' color='textSecondary'>
              {zodiac.description}
            </Text>
          </Section>

          <Section title={t('zodiacLearning.traits')} icon='astrology'>
            <View style={styles.traits}>
              {zodiac.traits.map(trait => (
                <View key={trait} style={styles.trait}>
                  <Text variant='label'>{trait}</Text>
                </View>
              ))}
            </View>
          </Section>

          <View style={styles.columns}>
            <View style={styles.column}>
              <Section
                title={t('zodiacLearning.strengths')}
                icon='diamond'
                tone='success'
              >
                {zodiac.strengths.map(strength => (
                  <View key={strength} style={styles.bulletRow}>
                    <View style={styles.bullet('success')} />
                    <Text
                      variant='label'
                      color='textSecondary'
                      style={styles.bulletText}
                    >
                      {strength}
                    </Text>
                  </View>
                ))}
              </Section>
            </View>
            <View style={styles.column}>
              <Section
                title={t('zodiacLearning.challenges')}
                icon='thunder'
                tone='error'
              >
                {zodiac.challenges.map(challenge => (
                  <View key={challenge} style={styles.bulletRow}>
                    <View style={styles.bullet('error')} />
                    <Text
                      variant='label'
                      color='textSecondary'
                      style={styles.bulletText}
                    >
                      {challenge}
                    </Text>
                  </View>
                ))}
              </Section>
            </View>
          </View>

          <Section
            title={t('zodiacLearning.inLove', {
              sign: zodiacName,
            })}
            icon='heartSolid'
          >
            <Text variant='label' color='textSecondary'>
              {zodiac.love}
            </Text>
          </Section>

          <Section title={t('compatibility')} icon='profile'>
            <Text variant='label' color='textSecondary'>
              {t('zodiacLearning.compatibleWith', {
                sign: zodiacName,
              })}
            </Text>
            <View style={styles.compatibility}>
              {zodiac.compatibility.best.map(compatibleId => {
                const compatible = zodiacList.find(
                  item => item.id === compatibleId,
                );
                if (!compatible) {
                  throw new Error(`Unknown compatible zodiac: ${compatibleId}`);
                }
                return (
                  <Pressable
                    key={compatibleId}
                    style={styles.compatibilityCard}
                    accessibilityRole='button'
                    accessibilityLabel={t('zodiacLearning.openSign', {
                      sign: t(compatibleId),
                    })}
                    onPress={() =>
                      navigation.push('ZodiacDetails', { id: compatibleId })
                    }
                  >
                    <Image
                      source={compatible.image}
                      style={styles.compatibilityImage}
                      resizeMode='contain'
                    />
                    <Text variant='label' color='textGold' textAlign='center'>
                      {t(compatibleId)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Section>
        </>
      )}
    </MainLayout>
  );
};
