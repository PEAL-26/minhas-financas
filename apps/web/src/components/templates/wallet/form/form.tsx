import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { useQuerySelect } from '@repo/database/hooks/use-query-select';
import { ACCOUNT_TYPE_ENUM, ACCOUNT_TYPE_MAP } from '@repo/types/account';
import { WalletSchemaType } from '@repo/types/schemas';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { TextareaFormControl } from '@repo/ui/form/control/textarea';
import { showToastError } from '@repo/ui/helpers/toast';
import { MultiSelect } from '@repo/ui/multi-select';
import { Switch } from '@repo/ui/switch';

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
        <FormControlCustom name="account" control={mutation.form.control}>
          {({ field }) => {
            const type = ACCOUNT_TYPE_MAP?.[field?.value?.type];
            return (
              <CustomCardDropdown
                title={field.value?.name}
                description={type?.display}
                backgroundColor={'transparent'}
                borderColor={type?.color || 'transparent'}
                color={type?.color || 'black'}
                icon={type?.icon || 'wallet'}
                labelField="name"
                placeholder="Selecione uma conta"
                items={selectAccounts.data.map((account: any) => {
                  const type = ACCOUNT_TYPE_MAP?.[account.type as keyof typeof ACCOUNT_TYPE_MAP];
                  return {
                    ...account,
                    ...type,
                    description: type?.display,
                    backgroundColor: 'transparent',
                    borderColor: type?.color || 'transparent',
                  };
                })}
                onChange={(account) => {
                  if (account?.type !== ACCOUNT_TYPE_ENUM.BANK) {
                    mutation?.form?.setValue('iban', null);
                  }

                  field.onChange(account);
                }}
                onSearch={selectAccounts.search}
                loading={selectAccounts.isLoadingAll}
              />
            );
          }}
        </FormControlCustom>

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

        <FormControlCustom label="Moedas" name="currencies" control={mutation.form.control}>
          {({ field }) => {
            return (
              <MultiSelect
                modal
                fieldLabel="currency"
                fieldValue="code"
                itemsValuesSelected={field.value}
                items={[
                  { code: 'AOA', currency: 'Kwanza' },
                  { code: 'USD', currency: 'Dólar' },
                  { code: 'BTC', currency: 'Bitcoin' },
                ]}
                placeholder="Selecione a(s) moeda(s)"
                onChangeItems={(items) => field.onChange(items.map((i) => i.code))}
              />
            );
          }}
        </FormControlCustom>

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
