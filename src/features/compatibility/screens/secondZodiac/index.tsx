import { ChooseZodiac, ZodiacId } from '../chooseZodiac';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCompatibility } from '../../context/CompatibilityContext';
import { CompatibilityStackParamList } from '@common/types.ts';

export const SecondZodiac = () => {
  const { selection, selectSecond } = useCompatibility();

  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  return (
    <ChooseZodiac
      title='chooseSecondZodiac'
      id={ZodiacId.SecondZodiac}
      selectedZodiacId={selection.second}
      onCardPress={item => {
        selectSecond(item.id);
        navigation.navigate('CalculatingResult');
      }}
    />
  );
};
