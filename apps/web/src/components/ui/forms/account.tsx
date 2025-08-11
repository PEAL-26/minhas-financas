import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { ACCOUNT_TYPE_ENUM, ACCOUNT_TYPE_MAP } from '@repo/types/account';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
}

export function AccountFormComponent(props: Props) {
  const { form, response } = props;

  return (
    <FormControlCustom name="account" control={form.control}>
      {({ field }) => {
        const type = ACCOUNT_TYPE_MAP?.[field?.value?.type as ACCOUNT_TYPE_ENUM];
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
            items={response.data.map((account: any) => {
              const type = ACCOUNT_TYPE_MAP?.[account.type as keyof typeof ACCOUNT_TYPE_MAP];
              return {
                ...account,
                ...type,
                description: type?.display,
                backgroundColor: 'transparent',
                borderColor: type?.color || 'transparent',
              };
            })}
            onChange={(account: any) => {
              if (account?.type !== ACCOUNT_TYPE_ENUM.BANK) {
                form?.setValue('iban', null);
              }

              field.onChange(account);
            }}
            onSearch={response.search}
            loading={response.isLoadingAll}
          />
        );
      }}
    </FormControlCustom>
  );
}
