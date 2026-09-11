import { Button, MainLayout, Text } from '@common/components';
import { toggleTheme } from '@common/utils/toggleTheme';

export const Home = () => {
  return (
    <MainLayout backgroundColor="white">
      <Text>Home</Text>
      <Button onPress={() => toggleTheme()}>change theme</Button>
    </MainLayout>
  );
};
