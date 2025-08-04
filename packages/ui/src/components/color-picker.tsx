import Chrome, { ChromeProps } from '@uiw/react-color-chrome';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface ColorPickerProps extends ChromeProps {
  modal?: boolean;
}

export function ColorPicker(props: ColorPickerProps) {
  const { children, modal, ...rest } = props;
  const [hex, setHex] = useState('#fff');

  return (
    <Popover modal={modal}>
      <PopoverTrigger asChild>
        {children ? (
          children
        ) : (
          <button className="h-8 w-8 rounded-full border border-gray-300 bg-white" />
        )}
      </PopoverTrigger>
      <PopoverContent
        portal={false}
        className="z-[9999999999999999999999999999999999999999999999999999999999] p-0"
      >
        <div className="w-[200px] p-2">
          <Chrome
            {...rest}
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
