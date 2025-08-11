import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { useQuerySelect } from '@repo/database/hooks/use-query-select';
import { ACCOUNT_TYPE_ENUM } from '@repo/types/account';
import { WalletSchemaType } from '@repo/types/schemas';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { TextareaFormControl } from '@repo/ui/form/control/textarea';
import { showToastError } from '@repo/ui/helpers/toast';
import { Switch } from '@repo/ui/switch';

import { AccountFormComponent } from '@/components/ui/forms/account';
import { CurrenciesFormComponent } from '@/components/ui/forms/currencies';
import { Label } from '@repo/ui/label';
import { WalletFormProps } from './types';

export function WalletFormSheet(props: WalletFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<WalletSchemaType>({
    id,
    loadingData: open,
    defaultValues: {},
    repositoryName: 'wallet',
    queryKey: ['wallets'],
    onSuccess: () => {
      onClose?.();
    },
    onError: (error) => {
      showToastError(error);
    },
  });

  const selectAccounts = useQuerySelect({
    repositoryName: 'account',
    queryKey: ['accounts'],
    defaultSize: 100,
  });

  return (
    <SheetForm
      id={id}
      open={open}
      entity="carteira"
      description={FORM_DESCRIPTION.WALLET}
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
        <AccountFormComponent form={mutation.form} response={selectAccounts} />

        <InputFormControl
          name="title"
          label="Título"
          placeholder="Ex.: Salário"
          control={mutation?.form?.control}
        />

        <InputFormControl
          name="reference"
          label="Referência"
          placeholder="Ex.: nº da conta, email ou telefone"
          control={mutation?.form?.control}
        />

        {mutation?.form?.watch('account.type') === ACCOUNT_TYPE_ENUM.BANK && (
          <InputFormControl
            name="iban"
            label="IBAN"
            placeholder="Ex.: AO06 004 0010 0000 1010 1011"
            control={mutation?.form?.control}
          />
        )}

        <TextareaFormControl
          name="details"
          label="Detalhes"
          placeholder="Ex.: Conta para recebimento"
          control={mutation?.form?.control}
        />

        <CurrenciesFormComponent form={mutation.form} />

        {id && (
          <FormControlCustom name="active" control={mutation.form.control}>
            {({ field }) => {
              return (
                <div className="flex w-full items-center justify-between">
                  <Label>Activa</Label>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </div>
              );
            }}
          </FormControlCustom>
        )}
      </div>
    </SheetForm>
  );
}
