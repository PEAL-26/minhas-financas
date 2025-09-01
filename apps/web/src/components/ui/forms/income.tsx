import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { ACCOUNT_TYPE_MAP } from '@repo/types/account';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputSuggestions } from '@repo/ui/input';
import { CategoryComponent } from '../category-component';

interface Props {
  form: any;
  response: any;
  name?: string;
  label?: string;
  containerClassName?: string;
  disableValueChange?: boolean;
  onChange?(item: any | null): void;
  onChangeValue?(value: string | null): void;
  onSelectItem?(item: any | null): void;
}

export function IncomeFormComponent(props: Props) {
  const {
    form,
    response,
    name = 'income',
    label,
    containerClassName,
    disableValueChange = false,
    onChangeValue,
    onSelectItem,
  } = props;

  return (
    <FormControlCustom
      label={label}
      control={form?.control}
      containerClassName={containerClassName}
      {...(disableValueChange ? { name: '' } : { name })}
    >
      {({ field }) => {
        const item = form.getValues('incomes.0.income');
        return (
          <InputSuggestions
            placeholder="Insira descrição ou selecione"
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              onChangeValue?.(e.target?.value);
            }}
            item={item}
            items={response.data.map((income: any) => {
              const type =
                ACCOUNT_TYPE_MAP?.[income?.wallet?.account?.type as keyof typeof ACCOUNT_TYPE_MAP];

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
            })}
            renderItem={({ item }) => (
              <CategoryComponent
                title={item?.title}
                description={item?.description}
                color={item?.color}
                backgroundColor={item?.backgroundColor}
                borderColor={item?.borderColor}
                icon={item?.icon}
                sizeIcon={24}
              />
            )}
            onSelectItem={onSelectItem}
            onSearch={response?.search}
            isLoading={response?.isLoadingAll}
            isError={response?.isError}
            isEmpty={response?.isEmpty}
          />
        );

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
            onSearch={response.search}
            loading={response.isLoadingAll}
          />
        );
      }}
    </FormControlCustom>
  );
}
