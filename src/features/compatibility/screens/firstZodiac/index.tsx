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
  const { zodiac, setZodiac } = useContext(
    CompatibilityContext,
  ) as CompatibilityContextType;

  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  return (
    <ChooseZodiac
      title='chooseZodiac'
      id={ZodiacId.FirstZodiac}
      selectedZodiacId={zodiac[0]?.id}
      onCardPress={item => {
        if (setZodiac) {
          setZodiac(previous => [
            { id: item.id, name: item.name, image: item.image },
            ...previous.slice(1, 2),
          ]);
        }
        navigation.navigate('SecondZodiac');
      }}
    />
  );
};
