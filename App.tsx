import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Text, Button, Icon } from '@common/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { changeLanguage } from '@common/utils/changeLanguage';
import { changeTheme } from '@common/utils/changeTheme';
import Avatar from '@common/components/Avatar';
import { appImages } from '@assets/images';
import TextInput from '@common/components/TextInput';

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
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
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
      <Button variant='primary'>{t('helloWorld')}</Button>
      <Button variant='secondary'>{t('helloWorld')}</Button>
      <Button variant='premium'>{t('helloWorld')}</Button>
      <Button variant='destructive'>{t('helloWorld')}</Button>
      <Button variant='ghost'>{t('helloWorld')}</Button>
      <Button variant='outline'>{t('helloWorld')}</Button>
      <Button loading>{t('helloWorld')}</Button>
      <Button size='large'>{t('helloWorld')}</Button>
      <Button size='small'>{t('helloWorld')}</Button>
      <Button size='medium'>{t('helloWorld')}</Button>
      <Button fullWidth onPress={() => changeLanguage('ar')}>
        Change Lang
      </Button>
      <Button fullWidth onPress={() => changeTheme('dark')}>
        Change Theme
      </Button>
      <Button leftIcon={<Icon name='closeEye' />}>{t('helloWorld')}</Button>
      <Button rightIcon={<Icon name='openEye' />}>{t('helloWorld')}</Button>
      <Icon name='openEye' />
      <Avatar size='large' isGirl />
      <Avatar size='medium' localImage={appImages.woman} />
      <TextInput
        label={t('helloWorld')}
        required
        onValueChange={val => console.log(val)}
      />
    </ScrollView>
  );
};
export default App;
