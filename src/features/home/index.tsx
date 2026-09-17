import { Button, MainLayout, Text } from '@common/components';
import { CompatibilityCircle } from '@common/components/CompatibilityCircle';
import { toggleTheme } from '@common/utils/toggleTheme';

export const Home = () => {
  return (
    <MainLayout backgroundColor='white'>
      <Text>Home</Text>
      <CompatibilityCircle percentage={75} label='Hello' />
      <Button onPress={() => toggleTheme()}>change theme</Button>
    </MainLayout>
  );
};
