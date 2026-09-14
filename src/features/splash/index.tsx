import { appImages } from '@assets/images';
import { Button, MainLayout, Text, ZodiacCard } from '@common/components';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '@common/types.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const Splash = () => {
  const { t } = useTranslation();
  return (
    <MainLayout style={{ gap: 24 }}>
      <Text>Splash</Text>

     
    </MainLayout>
  );
};
