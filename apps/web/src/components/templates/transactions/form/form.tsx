import { IncomeFormComponent } from '@/components/ui/forms/income';
import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { useQuerySelect } from '@repo/database/hooks/use-query-select';
import { TransactionSchemaType } from '@repo/types/schemas';
import { showToastError } from '@repo/ui/helpers/toast';

import { ExpenseFormComponent } from '@/components/ui/forms/expense';
import { TRANSACTION_TYPE_ENUM, TRANSACTION_TYPE_MAP } from '@repo/types/transaction';
import { DatePicker } from '@repo/ui/date-picker';
import { FormControlCustom } from '@repo/ui/form/control';
import { TextareaFormControl } from '@repo/ui/form/control/textarea';
import { InputMoney } from '@repo/ui/input-money';
import { cn } from '@repo/ui/lib/utils';
import { TransactionFormProps } from './types';

export function TransactionFormSheet(props: TransactionFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<TransactionSchemaType>({
    id,
    loadingData: open,
    defaultValues: {
      date: new Date(),
    },
    repositoryName: 'transaction',
    queryKey: ['transactions'],
    onSuccess: () => {
      onClose?.();
    },
    onError: (error) => {
      showToastError(error);
    },
  });

  const selectExpense = useQuerySelect({
    repositoryName: 'expense',
    queryKey: ['expenses'],
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
      entity="transação"
      description={FORM_DESCRIPTION.TRANSACTION}
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
        <FormControlCustom require control={mutation.form.control} name="type">
          {({ field }) => (
            <div className="grid w-full grid-cols-2 gap-3">
              {Object.entries(TRANSACTION_TYPE_MAP).map(([key, value]) => (
                <div
                  style={{
                    borderColor: key === field.value ? value.color : undefined,
                    color: key === field.value ? value.color : undefined,
                    backgroundColor: key === field.value ? `${value.color}30` : undefined,
                  }}
                  onClick={() => {
                    field.onChange(key);
                  }}
                  className={cn(
                    'flex w-full flex-col items-center justify-center gap-1 rounded-lg border p-3 transition-all duration-300 hover:cursor-pointer hover:bg-gray-100',
                  )}
                >
                  <span className="text-center text-xs">{value.display}</span>
                </div>
              ))}
            </div>
          )}
        </FormControlCustom>

        {mutation.form.watch('type') === TRANSACTION_TYPE_ENUM.EXPENSE && (
          <ExpenseFormComponent form={mutation.form} response={selectExpense} />
        )}

        {mutation.form.watch('type') === TRANSACTION_TYPE_ENUM.INCOME && (
          <IncomeFormComponent form={mutation.form} response={selectIncome} />
        )}

        <FormControlCustom name="date" label="Data" control={mutation.form.control}>
          {({ field }) => (
            <DatePicker modal defaultDate={field?.value || undefined} onChange={field.onChange} />
          )}
        </FormControlCustom>

        <FormControlCustom
          require
          label="Montante Total"
          name="totalAmount"
          control={mutation?.form?.control}
        >
          {({ field }) => (
            <InputMoney
              value={field.value}
              onChangeValue={(value) => field.onChange(Number(value || '0'))}
              placeholder="0,00"
            />
          )}
        </FormControlCustom>

        <TextareaFormControl
          label="Detalhes"
          name="note"
          control={mutation?.form?.control}
          placeholder=""
        />
      </div>
    </SheetForm>
  );
}
