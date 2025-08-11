import { FormControlCustom } from '@repo/ui/form/control';
import { SelectSearch } from '@repo/ui/select';

interface Props {
  form: any;
  statusMap: Record<string, any>;
}

export function StatusFormComponent(props: Props) {
  const { form, statusMap } = props;

  return (
    <FormControlCustom label="Estado" name="status" control={form.control}>
      {({ field }) => {
        return (
          <SelectSearch
            modal
            className="w-full bg-white"
            itemValue={field.value}
            items={Object.entries(statusMap).map(([key, value]) => ({
              id: key,
              key,
              name: value?.display,
              color: value?.color,
            }))}
            onSelect={(item) => field.onChange(item.key)}
          />
        );
      }}
    </FormControlCustom>
  );
}
