import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { wishlistMockData } from '@repo/database/mocks';
import { formatCurrency } from '@repo/helpers/currency';
import { colors } from '@repo/ui/colors';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
}

export function ExpenseFormComponent(props: Props) {
  const { form, response } = props;

  return (
    <FormControlCustom label="Despesa" name="expense" control={form?.control}>
      {({ field }) => {
        return (
          <CustomCardDropdown
            modal
            title={field.value?.name}
            description={field.value?.description}
            backgroundColor={field.value?.backgroundColor || colors.primary.DEFAULT}
            icon={field.value?.icon || 'tag'}
            labelField="name"
            placeholder="Selecione uma despesa"
            items={[
              {
                id: 'NULL',
                name: 'Desselecionar',
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...wishlistMockData.map((item) => {
                const category = item.category;
                return {
                  ...item,
                  description: `${category?.name ? `${category.name} |` : ''} ${formatCurrency(item.estimatedCost || 0)}`,
                  backgroundColor: category?.color || colors.primary.DEFAULT,
                  icon: category?.icon || 'tag',
                };
              }),
            ]}
            onChange={(item) => {
              if (item?.id === 'NULL') {
                field.onChange(null);
              } else {
                field.onChange(item);
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
