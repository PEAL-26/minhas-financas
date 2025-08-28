import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { ACCOUNT_TYPE_MAP } from '@repo/types/account';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
  required?: boolean;
}

export function WalletFormComponent(props: Props) {
  const { form, response, required } = props;

  return (
    <FormControlCustom required={required} label="Carteira" name="wallet" control={form.control}>
      {({ field }) => {
        const type =
          ACCOUNT_TYPE_MAP?.[field?.value?.account?.type as keyof typeof ACCOUNT_TYPE_MAP];
        const description = `${type?.display ? `${type.display} |` : ''} ${field.value?.account?.name || ''}`;

        return (
          <CustomCardDropdown
            title={field.value?.title}
            description={description}
            backgroundColor={'transparent'}
            borderColor={type?.color || 'transparent'}
            color={type?.color || 'black'}
            icon={type?.icon || 'wallet'}
            labelField="title"
            placeholder="Selecione uma conta"
            items={[
              {
                id: 'NULL',
                title: 'Desselecionar',
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...response.data.map((wallet: any) => {
                const type =
                  ACCOUNT_TYPE_MAP?.[wallet.account?.type as keyof typeof ACCOUNT_TYPE_MAP];
                return {
                  ...wallet,
                  ...type,
                  description: `${type?.display ? `${type.display} |` : ''} ${wallet.account.name}`,
                  backgroundColor: 'transparent',
                  borderColor: type?.color || 'transparent',
                };
              }),
            ]}
            onChange={(wallet: any) => {
              if (wallet?.id === 'NULL') {
                field.onChange(null);
              } else {
                field.onChange(wallet);
              }
            }}
            onSearch={response.search}
            loading={response.isLoadingAll}
          />
        );
      }}
    </FormControlCustom>
  );
}
