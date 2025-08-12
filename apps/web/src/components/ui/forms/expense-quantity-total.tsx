import { formatCurrency } from '@repo/helpers/currency';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { Input } from '@repo/ui/input';

interface Props {
  form: any;
  quantityName?: string;
  totalName?: string;
  quantityLabel?: string;
  totalLabel?: string;
  quantityPlaceholder?: string;
  totalPlaceholder?: string;
  onChangeQuantity?(): void;
}

export function ExpenseQuantityTotalFormComponent(props: Props) {
  const {
    form,
    quantityLabel,
    quantityName = 'quantity',
    totalLabel,
    totalName = 'total',
    quantityPlaceholder,
    totalPlaceholder,
    onChangeQuantity,
  } = props;

  return (
    <div className="flex items-center gap-3">
      <InputFormControl
        name={quantityName}
        label={quantityLabel}
        control={form?.control}
        placeholder={quantityPlaceholder}
        onChange={onChangeQuantity}
        className="text-center"
        containerClassName="flex-1 w-fit"
      />

      <FormControlCustom label={totalLabel} name={totalName} control={form.control}>
        {({ field }) => (
          <Input
            value={formatCurrency(field.value)}
            readOnly
            placeholder={totalPlaceholder}
            className="w-full bg-gray-200 text-right"
          />
        )}
      </FormControlCustom>
    </div>
  );
}
