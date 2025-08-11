import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { colors } from '@repo/ui/colors';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
}

export function CategoryFormComponent(props: Props) {
  const { form, response } = props;

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
              if (rest?.id === 'NULL') {
                field.onChange(null);
              } else {
                field.onChange({ ...rest, color: backgroundColor });
              }
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
