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
  const { zodiac, setZodiac } = useContext(
    CompatibilityContext,
  ) as CompatibilityContextType;

  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  return (
    <ChooseZodiac
      title='chooseSecondZodiac'
      id={ZodiacId.SecondZodiac}
      selectedZodiacId={zodiac[1]?.id}
      onCardPress={item => {
        if (setZodiac) {
          setZodiac(prev => [
            ...prev.slice(0, 1),
            { id: item.id, name: item.name, image: item.image },
          ]);
        }
        navigation.navigate('CalculatingResult');
      }}
    />
  );
};
