import { Button, Text } from '@common/components';
import { RootStackParamList } from '@common/types.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';

export const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>Splash</Text>
      <Button
        onPress={() => {
          navigation.navigate('MainTabs');
        }}
      >
        X
      </Button>
    </View>
  );
};
