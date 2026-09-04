import Icon from '@common/components/Icon';
import Text from '@common/components/Text';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <Content />
    </SafeAreaProvider>
  );
}

const Content = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text variant='title'>{t('helloWorld')}</Text>
      <Text variant='heading1'>{t('helloWorld')}</Text>
      <Text variant='heading2'>{t('helloWorld')}</Text>
      <Text variant='heading3'>{t('helloWorld')}</Text>
      <Text variant='body'>{t('helloWorld')}</Text>
      <Text variant='bodyMedium'>{t('helloWorld')}</Text>
      <Text variant='label'>{t('helloWorld')}</Text>
      <Text variant='button'>{t('helloWorld')}</Text>
      <Text variant='caption'>{t('helloWorld')}</Text>
      <Text variant='small'>{t('helloWorld')}</Text>
      <Icon name='reactNative' />
    </View>
  );
};
export default App;
