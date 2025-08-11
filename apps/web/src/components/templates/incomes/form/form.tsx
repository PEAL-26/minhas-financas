import { PriorityFormComponent } from '@/components/ui/forms/priority';
import { RecurrenceFormComponent } from '@/components/ui/forms/recurrence';
import { StatusFormComponent } from '@/components/ui/forms/status';
import { WalletFormComponent } from '@/components/ui/forms/wallet';
import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { useQuerySelect } from '@repo/database/hooks/use-query-select';
import { RECURRENCE_TYPE_ENUM } from '@repo/types/recurrence';
import { IncomeSchemaType } from '@repo/types/schemas';
import { INCOME_STATUS_ENUM, INCOME_STATUS_MAP } from '@repo/types/status';
import { DatePicker } from '@repo/ui/date-picker';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { showToastError } from '@repo/ui/helpers/toast';
import { InputMoney } from '@repo/ui/input-money';
import { IncomeFormProps } from './types';

export function IncomeFormSheet(props: IncomeFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<IncomeSchemaType>({
    id,
    loadingData: open,
    defaultValues: {
      type: RECURRENCE_TYPE_ENUM.UNIQUE,
      status: INCOME_STATUS_ENUM.PENDING,
    },
    repositoryName: 'income',
    queryKey: ['incomes'],
    onSuccess: () => {
      onClose?.();
    },
    onError: (error) => {
      showToastError(error);
    },
  });

  const selectWallet = useQuerySelect({
    repositoryName: 'wallet',
    queryKey: ['wallets'],
    defaultSize: 100,
  });

  return (
    <SheetForm
      id={id}
      open={open}
      entity="renda"
      description={FORM_DESCRIPTION.INCOME}
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
        <WalletFormComponent form={mutation.form} response={selectWallet} />

        <InputFormControl
          name="description"
          label="Descrição"
          placeholder="Ex.: Salário mensal, Venda de produtos, Aluguel de imóvel, etc."
          control={mutation?.form?.control}
        />

        <FormControlCustom require label="Montante" name="amount" control={mutation?.form?.control}>
          {({ field }) => (
            <InputMoney
              value={field.value}
              onChangeValue={(value) => field.onChange(Number(value || '0'))}
              placeholder="0,00"
              currencies={[...(mutation.form.watch('wallet.currencies') || [])].map((code) => ({
                code,
                name: code,
              }))}
            />
          )}
        </FormControlCustom>

        <RecurrenceFormComponent require label="Renda" form={mutation.form} />

        <PriorityFormComponent require form={mutation.form} />

        <InputFormControl
          name="duration"
          label="Duração"
          control={mutation?.form?.control}
          placeholder="0"
        />

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
          name="estimatedDateReceipt"
          label="Data Estimada de Recebimento"
          control={mutation.form.control}
        >
          {({ field }) => (
            <DatePicker modal defaultDate={field?.value || undefined} onChange={field.onChange} />
          )}
        </FormControlCustom>

        <StatusFormComponent form={mutation.form} statusMap={INCOME_STATUS_MAP} />
      </div>
    </SheetForm>
  );
}
