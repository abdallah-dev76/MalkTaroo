import { ChooseZodiac, ZodiacId } from '../chooseZodiac';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CompatibilityContext,
  CompatibilityContextType,
} from '../../../../navigation/compatibilityStack';
import { CompatibilityStackParamList } from '@common/types.ts';

export const SecondZodiac = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();
  const { setZodiac } = useContext(
    CompatibilityContext,
  ) as CompatibilityContextType;

  return (
    <ChooseZodiac
      title='chooseSecondZodiac'
      id={ZodiacId.SecondZodiac}
      onCardPress={item => {
        if (setZodiac) {
          setZodiac(prev => [
            ...prev,
            { id: item.id, name: item.name, image: item.image },
          ]);
        }
        navigation.navigate('CalculatingResult');
      }}
    />
  );
};
