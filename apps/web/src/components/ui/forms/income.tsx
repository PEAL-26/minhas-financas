import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { incomesMockData } from '@repo/database/mocks';
import { FormControlCustom } from '@repo/ui/form/control';

interface Props {
  form: any;
  response: any;
}

export function IncomeFormComponent(props: Props) {
  const { form, response } = props;

  return (
    <FormControlCustom label="Renda" name="income" control={form?.control}>
      {({ field }) => {
        return (
          <CustomCardDropdown
            modal
            //title={field.value?.name}
            //backgroundColor={field.value?.color || colors.primary.DEFAULT}
            //icon={field.value?.icon || 'tag'}
            labelField="title"
            placeholder="Selecione uma renda"
            items={
                incomesMockData /*selectCategories.data.map(({ color, ...rest }) => ({
                  ...rest,
                  backgroundColor: color,
                }))*/
            }
            // onChange={({ backgroundColor, ...rest }) =>
            //   field.onChange({ ...rest, color: backgroundColor })
            // }
            // onSearch={selectCategories.search}
            // loading={selectCategories.isLoadingAll}
          />
        );
      }}
    </FormControlCustom>
  );
}
