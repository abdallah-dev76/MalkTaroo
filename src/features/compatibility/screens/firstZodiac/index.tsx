import { CompatibilityStackParamList } from '@common/types.ts';
import { ChooseZodiac, ZodiacId } from '../chooseZodiac';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext } from 'react';
import {
  CompatibilityContext,
  CompatibilityContextType,
} from '../../../../navigation/compatibilityStack';

export const FirstZodiac = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();
  const { setZodiac } = useContext(
    CompatibilityContext,
  ) as CompatibilityContextType;

  return (
    <ChooseZodiac
      title='chooseZodiac'
      id={ZodiacId.FirstZodiac}
      onCardPress={item => {
        if (setZodiac) {
          setZodiac([{ id: item.id, name: item.name, image: item.image }]);
        }
        navigation.navigate('SecondZodiac');
      }}
    />
  );
};
