import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useListAll, useMutation } from '@repo/database/hooks/crud';
import { ACCOUNT_TYPE_MAP } from '@repo/types/account';
import { WalletSchemaType } from '@repo/types/schemas';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { showToastError } from '@repo/ui/helpers/toast';
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

  const accountList = useListAll({ repositoryName: 'account', queryKey: ['accounts'] });

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
                title={type?.display}
                color={type?.color}
                icon={type?.icon}
                labelField="title"
                placeholder="Selecione uma conta"
                items={accountList.data.map((account: any) => {
                  const type = ACCOUNT_TYPE_MAP?.[account.type as keyof typeof ACCOUNT_TYPE_MAP];
                  return { ...account, ...type };
                })}
                onChange={field.onChange}
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
          placeholder="Ex.: número de conta, endereço, email, telefone, etc."
          control={mutation?.form?.control}
        />
        <InputFormControl
          name="iban"
          label="IBAN"
          placeholder="Ex.: "
          control={mutation?.form?.control}
        />
        <InputFormControl
          name="details"
          label="Detalhes"
          placeholder="Ex.: "
          control={mutation?.form?.control}
        />
        <InputFormControl
          name="currencies"
          label="Moedas"
          placeholder="Ex.: AOA"
          control={mutation?.form?.control}
        />
        <InputFormControl name="active" label="Ativa" control={mutation?.form?.control} />
      </div>
    </SheetForm>
  );
}
