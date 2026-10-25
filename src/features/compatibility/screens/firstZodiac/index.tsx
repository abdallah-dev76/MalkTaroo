import { CompatibilityStackParamList } from '@common/types.ts';
import { ChooseZodiac, ZodiacId } from '../chooseZodiac';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCompatibility } from '../../context/CompatibilityContext';

export const FirstZodiac = () => {
  const { selection, selectFirst } = useCompatibility();

  const navigation =
    useNavigation<NativeStackNavigationProp<CompatibilityStackParamList>>();

  return (
    <ChooseZodiac
      title='chooseZodiac'
      id={ZodiacId.FirstZodiac}
      selectedZodiacId={selection.first}
      onCardPress={item => {
        selectFirst(item.id);
        navigation.navigate('SecondZodiac');
      }}
    />
  );
};
