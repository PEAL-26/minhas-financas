import { XIcon } from 'lucide-react';
import { Button } from '../button';

interface Props {
  text: string;
  onRemove?(): void;
}

export function Item(props: Props) {
  const { text, onRemove } = props;
  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-xs">
      <span className="text-black">{text}</span>
      <Button onClick={onRemove} className="group">
        <XIcon size={14} className="text-gray-400 group-hover:text-gray-600" />
      </Button>
    </div>
  );
}
