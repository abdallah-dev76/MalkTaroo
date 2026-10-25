import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Home } from '@features/home/screens/home';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import { Icon, Text } from '@common/components';
import { useUnistyles } from 'react-native-unistyles';
import { Profile } from '@features/profile/screens/profile';
import { IconName } from '@assets/icons';
import type { MainTabParamList } from '@common/types.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompatibilityStack } from './compatibilityStack';
import { TarotStack } from './TarotStack';
import { styles } from './mainTabs.styles';

const TAB_METADATA = {
  Home: { icon: 'home', label: 'home' },
  Tarot: { icon: 'cards', label: 'tarot' },
  Compatibility: { icon: 'heart', label: 'compatibility' },
  Profile: { icon: 'profile', label: 'profile' },
} satisfies Record<keyof MainTabParamList, { icon: IconName; label: string }>;

function MyTabBar({
  state,
  descriptors,
  navigation,
}: Readonly<BottomTabBarProps>) {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const { buildHref } = useLinkBuilder();
  const bottomInset = useSafeAreaInsets().bottom;

  return (
    <View style={styles.tabBarContainer(bottomInset)}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const tab = TAB_METADATA[route.name as keyof MainTabParamList];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Icon
              name={tab.icon}
              color={isFocused ? theme.textGold : theme.textSecondary}
              isFocused={isFocused}
            />
            <Text
              style={styles.tabLabel(isFocused)}
              variant='label'
              textAlign='center'
              numberOfLines={1}
            >
              {t(tab.label)}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabBar = (props: BottomTabBarProps) => <MyTabBar {...props} />;

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={tabBar}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Tarot' component={TarotStack} />
      <Tab.Screen name='Compatibility' component={CompatibilityStack} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
}

export default MainTabs;
