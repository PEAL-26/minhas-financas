import * as lucide from 'lucide-react';
import { ElementType } from 'react';

interface Props extends lucide.LucideProps {
  name: keyof typeof lucide;
}

export function IconComponent(props: Props) {
  const { name, ...rest } = props;
  const Icon = lucide[name] as ElementType;

  return <Icon {...rest} />;
}
