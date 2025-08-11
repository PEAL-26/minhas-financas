import { useEffect, useMemo, useState } from 'react';
import CurrencyFormat from 'react-currency-format';

import { cn } from '../../lib/utils';
import { inputVariants } from '../input';
import { CurrencySelect } from './currency-select';
import { InputMoneyProps } from './types';

export function InputMoney(props: InputMoneyProps) {
  const {
    className,
    currency,
    currencies,
    modal = true,
    onChangeCurrency,
    onChangeValue,
    ...rest
  } = props;

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
        <CurrencySelect
          modal={modal}
          currency={currency}
          currencies={currencies}
          onChangeCurrency={onChangeCurrency}
        />
      </div>
    </div>
  );
}
