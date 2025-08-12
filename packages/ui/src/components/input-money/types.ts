import { Props } from 'react-currency-format';

export type Currency = { code: string; name: string };

export type InputMoneyProps = Props & {
  modal?: boolean;
  currency?: Currency;
  currencies?: Currency[];
  containerClassName?: string;
  onChangeValue?: (value: string | undefined) => void;
  onChangeCurrency?: (currency: Currency) => void;
};

export type CurrencySelectProps = {
  modal?: boolean;
  currency?: Currency;
  currencies?: Currency[];
  onChangeCurrency?: (currency: Currency) => void;
};
