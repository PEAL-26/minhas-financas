import { includesEnum } from '@repo/helpers/enum';
import {
  RECURRENCE_ENUM,
  RECURRENCE_MAP,
  RECURRENCE_TYPE_ENUM,
  RECURRENCE_TYPE_MAP,
} from '@repo/types/recurrence';
import { FormControlCustom } from '@repo/ui/form/control';
import { Input } from '@repo/ui/input';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';

interface Props {
  form: any;
  label: string;
  require?: boolean;
}

export function RecurrenceFormComponent(props: Props) {
  const { form, label, require } = props;
  const [recurrenceCustomValue, setRecurrenceCustomValue] = useState(() => {
    const recurrence = form.getValues('recurrence');
    if (!includesEnum(RECURRENCE_ENUM, recurrence)) {
      return String(recurrence || '');
    }

    return '';
  });

  return (
    <>
      <FormControlCustom require={require} control={form.control} name="type" label={label}>
        {({ field }) => (
          <div className="grid w-full grid-cols-2 gap-3">
            {Object.entries(RECURRENCE_TYPE_MAP).map(([key, value]) => (
              <div
                onClick={() => {
                  if (key === RECURRENCE_TYPE_ENUM.UNIQUE) {
                    form.setValue('recurrence', null);
                  }

                  field.onChange(key);
                }}
                className={cn(
                  'flex w-full flex-col items-center justify-center gap-1 rounded-lg border p-3 transition-all hover:cursor-pointer hover:bg-gray-100',
                  field.value === key && 'bg-gray-100',
                )}
              >
                <span className="text-center text-xs">{value.display}</span>
              </div>
            ))}
          </div>
        )}
      </FormControlCustom>

      {form.watch('type') === RECURRENCE_TYPE_ENUM.RECURRENCE && (
        <FormControlCustom control={form.control} name="recurrence" label="Recorrência">
          {({ field }) => (
            <div className="flex items-center gap-2">
              {Object.entries(RECURRENCE_MAP).map(([key, value]) => (
                <div
                  onClick={() => {
                    setRecurrenceCustomValue('');
                    field.onChange(Number(key));
                  }}
                  className={cn(
                    'flex h-[36px] w-full flex-col items-center justify-center gap-1 rounded-lg border p-2 transition-all hover:cursor-pointer hover:bg-gray-100',
                    (field.value as any) === (key ? Number(key) : null) &&
                      !recurrenceCustomValue?.trim() &&
                      'bg-gray-100',
                  )}
                >
                  <span className="text-center text-[10px]">{value.display}</span>
                </div>
              ))}
              <Input
                value={recurrenceCustomValue}
                onChange={(e) => {
                  const value = (e.currentTarget as any)?.value || '';
                  setRecurrenceCustomValue(value);
                  field.onChange(Number(value || 0) || null);
                }}
                placeholder="Personalizado"
                className="text-[10px] placeholder:text-[10px] placeholder:text-gray-400"
              />
            </div>
          )}
        </FormControlCustom>
      )}
    </>
  );
}
