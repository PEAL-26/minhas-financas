import { hsvaToRgbString, rgbStringToHsva } from '@uiw/color-convert';
import Chrome, { ChromeProps } from '@uiw/react-color-chrome';
import { GithubPlacement } from '@uiw/react-color-github';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface ColorPickerProps extends ChromeProps {
  modal?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'center' | 'end' | 'start';
  onChangeColor?(rgba: string): void;
}

export function ColorPicker(props: ColorPickerProps) {
  const { children, modal, side, align, color, onChangeColor, onChange, ...rest } = props;
  const [hsva, setHsva] = useState(() => {
    if (color) {
      return rgbStringToHsva(String(color));
    }

    return { h: 0, s: 25.71, v: 82.35, a: 0.32 };
  });

  return (
    <Popover modal={modal}>
      <PopoverTrigger asChild>
        {children ? (
          children
        ) : (
          <button className="h-8 w-8 rounded-full border border-gray-300 bg-white" />
        )}
      </PopoverTrigger>
      <PopoverContent portal={false} className="w-fit p-0" side={side} align={align}>
        <Chrome
          {...rest}
          color={hsva}
          showTriangle={false}
          showAlpha={false}
          placement={GithubPlacement.Right}
          onChange={(color) => {
            setHsva(color.hsva);
            const rgbString = hsvaToRgbString(color.hsva);
            onChangeColor?.(rgbString);
            onChange?.(color);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
