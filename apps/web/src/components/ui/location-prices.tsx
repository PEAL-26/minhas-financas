import { Button } from '@repo/ui/button';
import { FormControlCustom } from '@repo/ui/form/control';
import { SelectFormControl } from '@repo/ui/form/control/select';
import { InputMoney } from '@repo/ui/input-money';
import { Label } from '@repo/ui/label';
import { PlusCircleIcon, Trash2 } from '@repo/ui/lib/lucide';
import { Control, FieldArrayPath, FieldValues, Path, useFieldArray } from 'react-hook-form';

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
    array.append({} as any);
  };

  const updateValue = (index: number, values: any) => {
    array.update(index, { ...values });
  };

  return (
    <div className="flex flex-col">
      <Label className="font-bold text-black">Preços: </Label>

      <div>
        {array.fields.length > 0 && (
          <div className="mb-2 mt-3 grid grid-cols-2 gap-2">
            <Label className="font-bold text-black">Local</Label>
            <Label className="font-bold text-black">Montante</Label>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {array.fields.map((field, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <SelectFormControl
                modal
                placeholder="Selecione o local"
                name={`${name}.${index}.location` as Path<TFieldValues>}
                control={control}
                className="w-full bg-white"
                item={(field as any)?.location}
                onSelect={(location) => {
                  updateValue(index, { location });
                }}
              />
              <div className="flex items-center gap-2">
                <FormControlCustom
                  control={control}
                  name={`${name}.${index}.amount` as Path<TFieldValues>}
                  defaultValue={(field as any)?.amount}
                >
                  {() => (
                    <InputMoney
                      value={(field as any)?.amount}
                      onChangeValue={(amount) => {
                        updateValue(index, { amount });
                      }}
                      placeholder="0,00"
                    />
                  )}
                </FormControlCustom>

                <Button
                  className="group"
                  onClick={() => {
                    array.remove(index);
                  }}
                >
                  <Trash2 className="size-4 text-red-500 group-hover:text-red-700" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center">
        <Button onClick={handleAddItem}>
          <PlusCircleIcon />
        </Button>
      </div>
    </div>
  );
}
