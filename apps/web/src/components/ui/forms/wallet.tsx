import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { walletsMockData } from '@repo/database/mocks';
import { ACCOUNT_TYPE_MAP } from '@repo/types/account';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
}

export function WalletFormComponent(props: Props) {
  const { form, response } = props;

  return (
    <FormControlCustom label="Carteira" name="wallet" control={form.control}>
      {({ field }) => {
        return (
          <CustomCardDropdown
            title={field.value?.title}
            description={field?.value?.description}
            backgroundColor={'transparent'}
            borderColor={field?.value?.color || 'transparent'}
            color={field?.value?.color || 'black'}
            icon={field?.value?.icon || 'wallet'}
            labelField="title"
            placeholder="Selecione uma conta"
            items={[
              {
                id: 'NULL',
                title: 'Desselecionar',
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...walletsMockData.map((wallet) => {
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
