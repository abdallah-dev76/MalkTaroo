import { icons, IconName } from '@assets/icons';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
};

const Icon = ({ name, size = 24, color = '#749' }: Props) => {
  const SvgIcon = icons[name];

  return <SvgIcon width={size} height={size} color={color} />;
};

export default Icon;
