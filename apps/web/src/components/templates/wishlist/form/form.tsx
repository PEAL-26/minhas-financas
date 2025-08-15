import { LocationPricesFormComponent } from '@/components/ui/forms/location-prices';
import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud/use-mutation';
import { useQuerySelect } from '@repo/database/hooks/use-query-select';
import { WishlistSchemaType } from '@repo/types/schemas';
import { WISHLIST_STATUS_MAP } from '@repo/types/status';
import { DatePicker } from '@repo/ui/date-picker';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { SelectFormControl } from '@repo/ui/form/control/select';
import { showToastError } from '@repo/ui/helpers/toast';
import { InputMoney } from '@repo/ui/input-money';

import { CategoryFormComponent } from '@/components/ui/forms/category';
import { PriorityFormComponent } from '@/components/ui/forms/priority';
import { RecurrenceFormComponent } from '@/components/ui/forms/recurrence';
import { StatusFormComponent } from '@/components/ui/forms/status';
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

  const selectCategories = useQuerySelect({
    repositoryName: 'category',
    queryKey: ['categories'],
    defaultSize: 100,
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
        <CategoryFormComponent form={mutation.form} response={selectCategories} />

        <InputFormControl
          name="name"
          label="Nome"
          control={mutation?.form?.control}
          placeholder="Ex.: Comprar um presente, Fazer uma viagem, etc."
        />

        <RecurrenceFormComponent label="Necessidade" form={mutation.form} />

        <PriorityFormComponent form={mutation.form} />

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

        {id && <StatusFormComponent form={mutation.form} statusMap={WISHLIST_STATUS_MAP} />}

        <LocationPricesFormComponent control={mutation.form.control} name="prices" />
      </div>
    </SheetForm>
  );
}
