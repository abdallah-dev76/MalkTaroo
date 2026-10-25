import { useState, type PropsWithChildren } from 'react';
import { Image, Pressable, View, type ImageSourcePropType } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import type { IconName } from '@assets/icons';
import { appImages } from '@assets/images';
import { Header, Icon, MainLayout, Text } from '@common/components';
import { tarotCards } from '@common/data/tarot';
import type { RootStackParamList } from '@common/types.ts';
import { getArrowDirection } from '@common/utils/getArrowDirection';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TarotCardDetails'>;

const Section = ({
  title,
  icon,
  image,
  children,
}: PropsWithChildren<{
  title: string;
  icon: IconName;
  image?: ImageSourcePropType;
}>) => {
  const { theme } = useUnistyles();

  return (
    <View style={[styles.box, styles.section]}>
      <View style={styles.sectionContent}>
        <View style={styles.sectionHeading}>
          <Icon name={icon} size={20} color={theme.textGold} />
          <Text
            variant='bodyMedium'
            color='textGold'
            style={styles.sectionTitle}
          >
            {title}
          </Text>
        </View>
        {children}
      </View>
      {image && (
        <Image
          source={image}
          style={styles.sectionImage}
          resizeMode='cover'
          accessible={false}
        />
      )}
    </View>
  );
};

const TarotCardDetailsContent = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const [orientation, setOrientation] = useState<'upright' | 'reversed'>(
    'upright',
  );
  const card = tarotCards.find(item => item.id === route.params.id);
  const meaning = card?.meanings[orientation];
  const sections = [
    { key: 'love', icon: 'heartSolid', image: appImages.couples },
    { key: 'career', icon: 'bag', image: appImages.createProfile },
    { key: 'money', icon: 'coins', image: appImages.dailyMessage },
    { key: 'spiritual', icon: 'flower', image: appImages.tarotLight },
  ] as const satisfies ReadonlyArray<{
    key: string;
    icon: IconName;
    image: ImageSourcePropType;
  }>;

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
          <Header.Title>{t('learnTarot')}</Header.Title>
        </Header>
      }
      contentContainerStyle={styles.container}
    >
      {!card ? (
        <Text textAlign='center'>{t('tarotLearning.notFound')}</Text>
      ) : (
        <>
          <View style={styles.cardData}>
            <View style={styles.heroContent}>
              <View>
                <Text variant='heading1' color='textGold'>
                  {card.nameAr}
                </Text>
                <Text variant='bodyMedium' color='textGold'>
                  {card.nameEn}
                </Text>
              </View>
              <View style={styles.badges}>
                <View style={styles.badge}>
                  <Icon name='cards' size={14} color={theme.textGold} />
                  <Text variant='caption' color='textSecondary'>
                    {t(`tarotLearning.arcana.${card.arcana}`)}
                  </Text>
                </View>
                {card.number !== null && (
                  <View style={styles.badge}>
                    <Text variant='caption' color='textSecondary'>
                      {t('tarotLearning.number', { number: card.number })}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                variant='label'
                color='textSecondary'
                style={styles.readingText}
              >
                {card.shortDescription}
              </Text>
            </View>
            <View style={styles.heroFrame}>
              <Image
                source={card.image}
                style={styles.heroImage(orientation)}
                resizeMode='contain'
                accessibilityLabel={card.nameEn}
              />
            </View>
          </View>
          <View style={styles.metadata}>
            {[
              {
                icon: 'astrology',
                label: t('tarotLearning.element'),
                value: t(`tarotLearning.elements.${card.element}`),
              },
              ...(card.astrology
                ? [
                    {
                      icon: 'star',
                      label: t('tarotLearning.astrology'),
                      value: t(
                        `zodiacLearning.planets.${card.astrology.toLowerCase()}`,
                        { defaultValue: card.astrology },
                      ),
                    },
                  ]
                : []),
              ...(card.suit
                ? [
                    {
                      icon: 'cards',
                      label: t('tarotLearning.suit'),
                      value: t(`tarotLearning.suits.${card.suit}`),
                    },
                  ]
                : []),
            ].map(item => (
              <View key={item.label} style={styles.metadataItem}>
                <Icon
                  name={item.icon as IconName}
                  size={24}
                  color={theme.textGold}
                />
                <Text variant='caption' color='textSecondary'>
                  {item.label}
                </Text>
                <Text variant='label' color='textGold' textAlign='center'>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
          <Section title={t('tarotLearning.general')} icon='cards'>
            <Text
              variant='label'
              color='textSecondary'
              style={styles.readingText}
            >
              {meaning?.summary}
            </Text>
          </Section>
          <View accessibilityRole='tablist' style={styles.tabs}>
            {(['upright', 'reversed'] as const).map(value => (
              <Pressable
                key={value}
                accessibilityRole='tab'
                accessibilityState={{ selected: orientation === value }}
                onPress={() => setOrientation(value)}
                style={[styles.tab, orientation === value && styles.activeTab]}
              >
                <Text
                  variant='label'
                  textAlign='center'
                  color={
                    orientation === value ? 'textInverse' : 'textSecondary'
                  }
                >
                  {t(`tarotLearning.${value}`)}
                </Text>
                <Text
                  variant='caption'
                  textAlign='center'
                  color={
                    orientation === value ? 'textInverse' : 'textSecondary'
                  }
                >
                  {value === 'upright' ? '(Upright)' : '(Reversed)'}
                </Text>
              </Pressable>
            ))}
          </View>
          {sections.map(section => (
            <Section
              key={section.key}
              title={t(`tarotLearning.${section.key}`)}
              icon={section.icon}
              image={section.image}
            >
              <Text
                variant='label'
                color='textSecondary'
                style={styles.readingText}
              >
                {meaning?.[section.key]}
              </Text>
            </Section>
          ))}
          <View style={styles.pairedSections}>
            <View style={styles.column}>
              <Section title={t('tarotLearning.yesNo')} icon='diamond'>
                <View style={styles.answerBox}>
                  <Text
                    variant='heading3'
                    color={card.yesNo.answer === 'yes' ? 'success' : 'textGold'}
                  >
                    {t(`tarotLearning.answers.${card.yesNo.answer}`)}
                  </Text>
                  <Text
                    variant='label'
                    color='textSecondary'
                    style={styles.readingText}
                  >
                    {card.yesNo.explanation}
                  </Text>
                </View>
              </Section>
            </View>
            <View style={styles.column}>
              <Section title={t('tarotLearning.keywords')} icon='star'>
                <View style={styles.keywords}>
                  {card.keywords[orientation].map(keyword => (
                    <View key={keyword} style={styles.keyword}>
                      <Text variant='caption' color='textGold'>
                        {keyword}
                      </Text>
                    </View>
                  ))}
                </View>
              </Section>
            </View>
          </View>
          <Section
            title={t('tarotLearning.timing')}
            icon='calender'
            image={appImages.zodiac}
          >
            <Text variant='label' color='textGold'>
              {card.timing.energy}
            </Text>
            <Text
              variant='label'
              color='textSecondary'
              style={styles.readingText}
            >
              {card.timing.message}
            </Text>
          </Section>
          <View style={styles.pairedSections}>
            <View style={styles.column}>
              <Section title={t('tarotLearning.advice')} icon='flower'>
                <Text
                  variant='label'
                  color='textSecondary'
                  style={styles.readingText}
                >
                  {card.advice}
                </Text>
              </Section>
            </View>
            <View style={styles.column}>
              <Section title={t('tarotLearning.warning')} icon='thunder'>
                <Text
                  variant='label'
                  color='textSecondary'
                  style={styles.readingText}
                >
                  {card.warning}
                </Text>
              </Section>
            </View>
          </View>
          {card.symbols.length > 0 && (
            <Section title={t('tarotLearning.symbols')} icon='astrology'>
              <View style={styles.symbols}>
                {card.symbols.map(symbol => (
                  <View key={symbol.name} style={styles.symbol}>
                    <Icon name='star' size={20} color={theme.textGold} />
                    <View style={styles.symbolContent}>
                      <Text variant='label' color='textGold'>
                        {symbol.name}
                      </Text>
                      <Text
                        variant='caption'
                        color='textSecondary'
                        style={styles.readingText}
                      >
                        {symbol.meaning}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Section>
          )}
        </>
      )}
    </MainLayout>
  );
};

export const TarotCardDetails = (props: Props) => (
  <TarotCardDetailsContent key={props.route.params.id} {...props} />
);
