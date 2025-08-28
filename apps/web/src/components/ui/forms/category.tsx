import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { colors } from '@repo/ui/colors';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
  onChange?(item: any): void;
}

export function CategoryFormComponent(props: Props) {
  const { form, response, onChange } = props;

  return (
    <FormControlCustom label="Categoria" name="category" control={form?.control}>
      {({ field }) => {
        return (
          <CustomCardDropdown
            modal
            title={field.value?.name}
            backgroundColor={field.value?.color || colors.primary.DEFAULT}
            icon={field.value?.icon || 'tag'}
            labelField="name"
            placeholder="Selecione uma categoria"
            onChange={({ backgroundColor, ...rest }: any) => {
              const data = rest?.id === 'NULL' ? null : { ...rest, color: backgroundColor };
              field.onChange(data);
              onChange?.(data);
            }}
            items={[
              {
                id: 'NULL',
                name: 'Desselecionar',
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...response.data.map(({ color, ...rest }: any) => ({
                ...rest,
                backgroundColor: color,
              })),
            ]}
            onSearch={response.search}
            loading={response.isLoadingAll}
          />
        );
      }}
    </FormControlCustom>
  );
}
