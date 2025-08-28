import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { colors } from '@repo/ui/colors';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
  onChange?(item: any | null): void;
  required?: boolean;
}

export function WishlistFormComponent(props: Props) {
  const { form, response, required, onChange } = props;

  return (
    <FormControlCustom
      required={required}
      label="Necessidades"
      name="wishlist"
      control={form?.control}
    >
      {({ field }) => {
        return (
          <CustomCardDropdown
            modal
            title={field.value?.name}
            description={field.value?.category?.name}
            backgroundColor={field.value?.category?.color || colors.primary.DEFAULT}
            icon={field.value?.category?.icon || 'tag'}
            labelField="name"
            placeholder="Selecione uma necessidade"
            items={[
              {
                id: 'NULL',
                name: 'Desselecionar',
                backgroundColor: undefined,
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...response.data.map((item: any) => {
                const color = item?.category?.color || colors.primary.DEFAULT;
                const icon = item?.category?.icon || 'tag';
                const category = { ...item?.category, color, icon };
                return {
                  ...item,
                  category,
                  description: item?.category?.name,
                  backgroundColor: color,
                  icon,
                };
              }),
            ]}
            onChange={({ backgroundColor, ...rest }) => {
              const data = rest?.id === 'NULL' ? null : { ...rest, color: backgroundColor };
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
