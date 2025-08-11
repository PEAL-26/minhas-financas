import { CategoryFormComponent } from '@/components/ui/forms/category';
import { IncomeFormComponent } from '@/components/ui/forms/income';
import { LocationPricesFormComponent } from '@/components/ui/forms/location-prices';
import { PriorityFormComponent } from '@/components/ui/forms/priority';
import { RecurrenceFormComponent } from '@/components/ui/forms/recurrence';
import { StatusFormComponent } from '@/components/ui/forms/status';
import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { useQuerySelect } from '@repo/database/hooks/use-query-select';
import { RECURRENCE_TYPE_ENUM } from '@repo/types/recurrence';
import { ExpenseSchemaType } from '@repo/types/schemas';
import { EXPENSE_STATUS_MAP } from '@repo/types/status';
import { DatePicker } from '@repo/ui/date-picker';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { showToastError } from '@repo/ui/helpers/toast';
import { InputMoney } from '@repo/ui/input-money';

import { WishlistFormComponent } from '@/components/ui/forms/wishlist';
import { ExpenseFormProps } from './types';

export function ExpenseFormSheet(props: ExpenseFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<ExpenseSchemaType>({
    id,
    loadingData: open,
    defaultValues: {
      type: RECURRENCE_TYPE_ENUM.UNIQUE,
    },
    repositoryName: 'expense',
    queryKey: ['expenses'],
    onSuccess: () => {
      onClose?.();
    },
    onError: (error) => {
      showToastError(error);
    },
  });

  const wishlist = mutation.form.watch('wishlist');

  const selectCategories = useQuerySelect({
    repositoryName: 'category',
    queryKey: ['categories'],
    defaultSize: 100,
  });

  const selectWishlist = useQuerySelect({
    repositoryName: 'wishlist',
    queryKey: ['wishlists'],
    defaultSize: 100,
  });

  const selectIncome = useQuerySelect({
    repositoryName: 'income',
    queryKey: ['incomes'],
    defaultSize: 100,
  });

  return (
    <SheetForm
      id={id}
      open={open}
      entity="despesa"
      description={FORM_DESCRIPTION.EXPENSE}
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
        <WishlistFormComponent form={mutation.form} response={selectWishlist} />

        <IncomeFormComponent form={mutation.form} response={selectIncome} />

        {(!wishlist || Object.values(wishlist || {}).length === 0) && (
          <>
            <CategoryFormComponent form={mutation.form} response={selectCategories} />
          </>
        )}

        <InputFormControl
          name="description"
          label="Descrição"
          placeholder="Ex.: Comprar um presente, Fazer uma viagem, etc."
          control={mutation?.form?.control}
        />

        <RecurrenceFormComponent label="Despesa" form={mutation.form} />

        <PriorityFormComponent form={mutation.form} />

        <FormControlCustom
          name="estimatedDate"
          label="Data Estimada"
          control={mutation.form.control}
        >
          {({ field }) => (
            <DatePicker modal defaultDate={field?.value || undefined} onChange={field.onChange} />
          )}
        </FormControlCustom>

        <div className="grid grid-cols-2 gap-3">
          <FormControlCustom name="startDate" label="Data Inicial" control={mutation.form.control}>
            {({ field }) => (
              <DatePicker modal defaultDate={field?.value || undefined} onChange={field.onChange} />
            )}
          </FormControlCustom>
          <FormControlCustom name="endDate" label="Data Final" control={mutation.form.control}>
            {({ field }) => (
              <DatePicker modal defaultDate={field?.value || undefined} onChange={field.onChange} />
            )}
          </FormControlCustom>
        </div>

        <FormControlCustom
          label="Montante Estimado"
          name="estimatedAmount"
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

        <StatusFormComponent form={mutation.form} statusMap={EXPENSE_STATUS_MAP} />

        <LocationPricesFormComponent control={mutation.form.control} name="prices" />
      </div>
    </SheetForm>
  );
}
