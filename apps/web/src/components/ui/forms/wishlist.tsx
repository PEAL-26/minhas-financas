import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { colors } from '@repo/ui/colors';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
}

export function WishlistFormComponent(props: Props) {
  const { form, response } = props;

  return (
    <FormControlCustom label="Necessidades" name="wishlist" control={form?.control}>
      {({ field }) => {
        return (
          <CustomCardDropdown
            modal
            title={field.value?.name}
            backgroundColor={field.value?.color || colors.primary.DEFAULT}
            icon={field.value?.icon || 'tag'}
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
                return { ...item, backgroundColor: color, icon };
              }),
            ]}
            onChange={({ backgroundColor, ...rest }) => {
              if (rest?.id === 'NULL') {
                field.onChange(null);
              } else {
                field.onChange({ ...rest, color: backgroundColor });
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
