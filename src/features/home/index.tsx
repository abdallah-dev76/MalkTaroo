import {
  Button,
  MainLayout,
  Text,
  CompatibilityCircle,
} from '@common/components';
import { toggleLanguage, toggleTheme } from '@common/utils';

export const Home = () => {
  return (
    <MainLayout>
      <Text>Home</Text>
      <CompatibilityCircle percentage={75} label='Hello' />
      <Button onPress={() => toggleTheme()}>change theme</Button>
      <Button onPress={() => toggleLanguage()}>Change Language</Button>
    </MainLayout>
  );
};
