import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { ACCOUNT_TYPE_MAP } from '@repo/types/account';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
  name?: string;
  label?: string;
  containerClassName?: string;
  onChange?(item?: any): void;
}

export function IncomeFormComponent(props: Props) {
  const { form, response, name = 'income', label, containerClassName, onChange } = props;

  return (
    <FormControlCustom
      label={label}
      name={name}
      control={form?.control}
      containerClassName={containerClassName}
    >
      {({ field }) => {
        return (
          <CustomCardDropdown
            modal
            title={field.value?.title}
            description={field?.value?.description}
            labelField="title"
            icon={field.value?.icon || 'wallet'}
            backgroundColor="transparent"
            borderColor={field?.value?.borderColor || 'transparent'}
            color={field?.value?.color || 'black'}
            placeholder="Selecione uma renda"
            items={[
              {
                id: 'NULL',
                title: 'Desselecionar',
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...response.data.map((income: any) => {
                const type =
                  ACCOUNT_TYPE_MAP?.[
                    income?.wallet?.account?.type as keyof typeof ACCOUNT_TYPE_MAP
                  ];

                return {
                  ...income,
                  ...type,
                  title: income?.description || 'Não definida',
                  description: `${type?.display ? `${type.display} |` : ''} ${income?.wallet?.title ? `${income.wallet.title} |` : ''} ${income?.amount || 0}`,
                  backgroundColor: 'transparent',
                  borderColor: type?.color || 'transparent',
                  icon: type?.icon || 'wallet',
                  color: type?.color || 'black',
                };
              }),
            ]}
            onChange={(income) => {
              const data = income?.id === 'NULL' ? null : income;
              field.onChange(data);
              onChange?.(data);
            }}
            onSearch={response.search}
            loading={response.isLoadingAll}
          />
        );
      }}
    </FormControlCustom>
  );
}
