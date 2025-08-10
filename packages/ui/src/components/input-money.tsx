import { AO } from 'country-flag-icons/react/1x1';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import CurrencyFormat, { Props } from 'react-currency-format';

import { cn } from '../lib/utils';
import { inputVariants } from './input';

export type InputMoneyProps = Props & { onChangeValue?: (value: string | undefined) => void };

export function InputMoney(props: InputMoneyProps) {
  const { className, onChangeValue, ...rest } = props;

  const value = useMemo(() => {
    return rest.value;
  }, [rest.value]);

  const [currentValue, setCurrentValue] = useState<string | undefined>(String(value || ''));

  const handleChangeValue = (value: string | undefined, update = true) => {
    setCurrentValue(value);

    if (update) {
      onChangeValue?.(value);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      handleChangeValue(String(value), false);
    }
  }, [value]);

  return (
    <div className="relative">
      <CurrencyFormat
        {...rest}
        thousandSeparator=" "
        fixedDecimalScale
        decimalScale={2}
        className={cn(inputVariants())}
        data-slot="input-money"
        value={currentValue || ''}
        onValueChange={(values) => {
          const { value } = values;
          handleChangeValue(value);
        }}
      />
      <div className="absolute bottom-0 right-3 top-0 flex items-center justify-center">
        <div className="input-small:p-1 flex w-fit items-center gap-1 rounded-full bg-gray-200 p-0 hover:cursor-pointer">
          <div className="h-4 w-4 rounded-full bg-white">
            <AO className="h-4 w-4 rounded-full" />
          </div>
          <span className="input-small:block hidden text-[8pt] text-gray-500">AOA</span>
          <div className="input-small:block hidden">
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
