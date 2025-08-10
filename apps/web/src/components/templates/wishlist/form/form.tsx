import { useState } from 'react';

import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { LocationPrices } from '@/components/ui/location-prices';
import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { categoriesMockData } from '@repo/database/mocks';
import { includesEnum } from '@repo/helpers/enum';
import { PRIORITY_ENUM, PRIORITY_MAP } from '@repo/types/priority';
import {
  RECURRENCE_ENUM,
  RECURRENCE_MAP,
  RECURRENCE_TYPE_ENUM,
  RECURRENCE_TYPE_MAP,
} from '@repo/types/recurrence';
import { WishlistSchemaType } from '@repo/types/schemas';
import { colors } from '@repo/ui/colors';
import { DatePicker } from '@repo/ui/date-picker';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { SelectFormControl } from '@repo/ui/form/control/select';
import { showToastError } from '@repo/ui/helpers/toast';
import { Input } from '@repo/ui/input';
import { InputMoney } from '@repo/ui/input-money';
import { cn } from '@repo/ui/lib/utils';

import { WISHLIST_STATUS_MAP } from '@repo/types/status';
import { WishlistFormProps } from './types';

export function WishlistFormSheet(props: WishlistFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<WishlistSchemaType>({
    id,
    loadingData: open,
    defaultValues: {},
    repositoryName: 'wishlist',
    queryKey: ['wishlists'],
    onSuccess: () => {
      onClose?.();
    },
    onError: (error) => {
      showToastError(error);
    },
  });

  const [recurrenceCustomValue, setRecurrenceCustomValue] = useState(() => {
    const recurrence = mutation.form.getValues('recurrence');
    if (!includesEnum(RECURRENCE_ENUM, recurrence)) {
      return String(recurrence || '');
    }

    return '';
  });

  return (
    <SheetForm
      id={id}
      open={open}
      entity="necessidade"
      description={FORM_DESCRIPTION.WISHLIST}
      form={mutation?.form}
      isLoadingData={mutation?.isLoadingData}
      isErrorLoadingData={!!mutation?.loadingDataError}
      isSubmitting={mutation?.isSubmitting}
      onClose={onClose}
      onConfirm={mutation?.handle}
      onReload={mutation?.reload}
      contentClassName="gap-0"
    >
      <div className="grid h-full flex-1 auto-rows-min gap-6 overflow-y-auto px-4">
        <FormControlCustom label="Categoria" name="category" control={mutation?.form?.control}>
          {({ field }) => {
            return (
              <CustomCardDropdown
                title={field.value?.name}
                color={field.value?.color || colors.primary.DEFAULT}
                icon={field.value?.icon || 'tag'}
                labelField="name"
                placeholder="Selecione uma categoria"
                items={categoriesMockData}
                modal
                onChange={field.onChange}
              />
            );
          }}
        </FormControlCustom>

        <InputFormControl
          name="name"
          label="Nome"
          control={mutation?.form?.control}
          placeholder="Ex.: Comprar um presente, Fazer uma viagem, etc."
        />

        <FormControlCustom control={mutation.form.control} name="type" label="Necessidade">
          {({ field }) => (
            <div className="grid w-full grid-cols-2 gap-3">
              {Object.entries(RECURRENCE_TYPE_MAP).map(([key, value]) => (
                <div
                  onClick={() => {
                    if (key === RECURRENCE_TYPE_ENUM.UNIQUE) {
                      mutation.form.setValue('recurrence', null);
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

        {mutation.form.watch('type') === RECURRENCE_TYPE_ENUM.RECURRENCE && (
          <FormControlCustom control={mutation.form.control} name="recurrence" label="Recorrência">
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

        <FormControlCustom control={mutation.form.control} name="priority" label="Prioridade">
          {({ field }) => (
            <div className="grid w-full grid-cols-3 gap-3">
              {Object.entries(PRIORITY_MAP).map(([key, value]) => (
                <div
                  onClick={() => field.onChange(Number(key))}
                  className={cn(
                    'flex w-full flex-col items-center justify-center gap-1 rounded-lg border p-3 transition-all hover:cursor-pointer hover:bg-gray-100',
                    String(field.value || PRIORITY_ENUM.NORMAL) === key && 'bg-gray-100',
                  )}
                >
                  <span className="text-center text-xs">{value.display}</span>
                </div>
              ))}
            </div>
          )}
        </FormControlCustom>

        <FormControlCustom name="targetDate" label="Data Prevista" control={mutation.form.control}>
          {({ field }) => (
            <DatePicker modal defaultDate={field?.value || undefined} onChange={field.onChange} />
          )}
        </FormControlCustom>

        <SelectFormControl
          modal
          label="Local Previsto"
          name="expectedLocation"
          control={mutation?.form?.control}
          className="w-full bg-white"
        />

        <FormControlCustom
          label="Custo Estimado"
          name="estimatedCost"
          control={mutation?.form?.control}
        >
          {({ field }) => (
            <InputMoney value={field.value} onChangeValue={field.onChange} placeholder="0,00" />
          )}
        </FormControlCustom>

        <InputFormControl
          name="quantity"
          label="Quantidade"
          control={mutation?.form?.control}
          placeholder="0"
        />

        <FormControlCustom label="Total" name="total" control={mutation?.form?.control}>
          {({ field }) => (
            <InputMoney value={field.value} onChangeValue={field.onChange} placeholder="0,00" />
          )}
        </FormControlCustom>

        {id && (
          <SelectFormControl
            modal
            control={mutation.form.control}
            name="status"
            label="Estado"
            className="w-full bg-white"
            items={Object.entries(WISHLIST_STATUS_MAP).map(([key, value]) => ({
              id: key,
              key,
              name: value.display,
              color: value.color,
            }))}
          />
        )}

        <LocationPrices control={mutation.form.control} name="prices" />
      </div>
    </SheetForm>
  );
}
