import { FormControlCustom } from '@repo/ui/form/control';
import { MultiSelect } from '@repo/ui/multi-select';

interface Props {
  form: any;
}

export function CurrenciesFormComponent(props: Props) {
  const { form } = props;

  return (
    <FormControlCustom label="Moedas" name="currencies" control={form.control}>
      {({ field }) => {
        return (
          <MultiSelect
            modal
            fieldLabel="currency"
            fieldValue="code"
            itemsValuesSelected={field.value}
            items={[
              { code: 'AOA', currency: 'Kwanza' },
              { code: 'USD', currency: 'Dólar' },
              { code: 'BTC', currency: 'Bitcoin' },
            ]}
            placeholder="Selecione a(s) moeda(s)"
            onChangeItems={(items) => field.onChange(items.map((i) => i.code))}
          />
        );
      }}
    </FormControlCustom>
  );
}
