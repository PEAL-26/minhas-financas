import { AO } from 'country-flag-icons/react/1x1';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Currency, CurrencySelectProps } from './types';

export function CurrencySelect(props: CurrencySelectProps) {
  const { currency, currencies, onChangeCurrency } = props;
  const [currentCurrency, setCurrentCurrency] = useState<Currency | undefined>(() => currency);

  const handleChangeCurrency = (currency: Currency, update = true) => {
    setCurrentCurrency(currency);

    if (update) {
      onChangeCurrency?.(currency);
    }
  };

  useEffect(() => {
    if (currency !== undefined) {
      handleChangeCurrency(currency, false);
    }
  }, [currency]);

  return (
    <Popover>
      <PopoverTrigger className="w-fit p-0">
        <div className="flex w-fit items-center gap-1 rounded-full bg-gray-200 p-0 hover:cursor-pointer input-small:p-1">
          <div className="h-4 w-4 rounded-full bg-white">
            <AO className="h-4 w-4 rounded-full" />
          </div>
          <span className="hidden text-[8pt] text-gray-500 input-small:block">AOA</span>
          <div className="hidden input-small:block">
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-fit"></PopoverContent>
    </Popover>
  );
}
