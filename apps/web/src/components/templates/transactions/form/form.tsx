import { IncomeFormComponent } from '@/components/ui/forms/income';
import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud/use-mutation';
import { useQuerySelect } from '@repo/database/hooks/use-query-select';
import { TransactionSchemaType } from '@repo/types/schemas';
import { showToastError } from '@repo/ui/helpers/toast';

import { TRANSACTION_TYPE_ENUM, TRANSACTION_TYPE_MAP } from '@repo/types/transaction';
import { DatePicker } from '@repo/ui/date-picker';
import { FormControlCustom } from '@repo/ui/form/control';
import { TextareaFormControl } from '@repo/ui/form/control/textarea';
import { InputMoney } from '@repo/ui/input-money';
import { cn } from '@repo/ui/lib/utils';
import { ExpensesList } from './expenses-list';
import { TransactionFormProps } from './types';

export function TransactionFormSheet(props: TransactionFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<TransactionSchemaType>({
    id,
    loadingData: open,
    defaultValues: {
      date: new Date(),
      type: TRANSACTION_TYPE_ENUM.INCOME,
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

  const querySelectExpenses = useQuerySelect({
    repositoryName: 'expense',
    queryKey: ['expenses'],
    defaultSize: 100,
  });

  const querySelectIncomes = useQuerySelect({
    repositoryName: 'income',
    queryKey: ['incomes'],
    defaultSize: 100,
  });

  const querySelectLocations = useQuerySelect({
    repositoryName: 'location',
    queryKey: ['locations'],
    defaultSize: 100,
  });

  const calculateTotal = (type: TRANSACTION_TYPE_ENUM) => {
    let total = 0;

    if (type === TRANSACTION_TYPE_ENUM.INCOME) {
      const incomes = mutation.form.getValues('incomes') || [];
      total = incomes.reduce((total, item) => total + Number(item.amount || 0), 0);
    }

    if (type === TRANSACTION_TYPE_ENUM.EXPENSE) {
      const expenses = mutation.form.getValues('expenses') || [];
      total = expenses.reduce((total, item) => total + Number(item.total || 0), 0);
    }

    mutation.form.setValue('totalAmount', total);
  };

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
                    if (key === TRANSACTION_TYPE_ENUM.EXPENSE) {
                      mutation.form.setValue('incomes', []);
                      mutation.form.setValue('expenses', [{ expense: null, quantity: 1 } as any]);
                    }

                    if (key === TRANSACTION_TYPE_ENUM.INCOME) {
                      mutation.form.setValue('incomes', [{} as any]);
                      mutation.form.setValue('expenses', []);
                    }

                    mutation.form.setValue('totalAmount', 0);
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

        <FormControlCustom name="date" label="Data" control={mutation.form.control}>
          {({ field }) => (
            <DatePicker modal defaultDate={field?.value || undefined} onChange={field.onChange} />
          )}
        </FormControlCustom>

        {mutation.form.watch('type') === TRANSACTION_TYPE_ENUM.EXPENSE && (
          <ExpensesList
            form={mutation.form}
            querySelectExpenses={querySelectExpenses}
            querySelectIncomes={querySelectIncomes}
            querySelectLocations={querySelectLocations}
            onChange={() => calculateTotal(TRANSACTION_TYPE_ENUM.EXPENSE)}
          />
        )}

        {mutation.form.watch('type') === TRANSACTION_TYPE_ENUM.INCOME && (
          <>
            <IncomeFormComponent
              form={mutation.form}
              response={querySelectIncomes}
              name="incomes.0.income"
              onChange={() => calculateTotal(TRANSACTION_TYPE_ENUM.INCOME)}
            />
            <FormControlCustom
              require
              label="Montante"
              name="incomes.0.amount"
              control={mutation?.form?.control}
            >
              {({ field }) => (
                <InputMoney
                  value={field.value}
                  onChangeValue={(value) => {
                    field.onChange(Number(value || '0'));
                    calculateTotal(TRANSACTION_TYPE_ENUM.INCOME);
                  }}
                  placeholder="0,00"
                />
              )}
            </FormControlCustom>
          </>
        )}

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
