import { Button } from '@repo/ui/button';
import { Label } from '@repo/ui/label';
import { PlusCircleIcon } from '@repo/ui/lib/lucide';
import { Control, FieldArrayPath, FieldValues, useFieldArray } from 'react-hook-form';

interface LocationPricesProps<
  TFieldValues extends FieldValues,
  TName extends FieldArrayPath<TFieldValues>,
> {
  name: TName;
  control?: Control<TFieldValues>;
}

export function LocationPrices<
  TFieldValues extends FieldValues,
  TName extends FieldArrayPath<TFieldValues>,
>(props: LocationPricesProps<TFieldValues, TName>) {
  const { name, control } = props;

  const array = useFieldArray<TFieldValues, TName, '_id'>({ name, control });

  const handleAddItem = () => {
    //array.append();
  };

  const updateValue = (index: number, values: any) => {
    array.update(index, { ...values });
  };

  return (
    <div className="flex flex-col">
      <Label className="font-bold text-black">Preços</Label>

      <div>
        {array.fields.map((field, index) => (
          <div key={index}>Local | Montante</div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Button onClick={handleAddItem}>
          <PlusCircleIcon />
        </Button>
      </div>
    </div>
  );
}
