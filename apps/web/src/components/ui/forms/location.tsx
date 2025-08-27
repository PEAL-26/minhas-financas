import { FormControlCustom } from '@repo/ui/form/control';
import { SelectSearch } from '@repo/ui/select';

interface Props {
  label?: string;
  name: string;
  control: any;
  response: any;
  modal?: boolean;
  className?: string;
  placeholder?: string;
  item?: any;
  onSelect?(item: any): void;
}

export function LocationFormComponent(props: Props) {
  const { label, name, control, response, modal, className, placeholder, item, onSelect } = props;
  return (
    <FormControlCustom defaultValue={item} label={label} name={name} control={control}>
      {({ field }) => {
        return (
          <SelectSearch
            modal={modal}
            className={className}
            placeholder={placeholder}
            item={field.value as any}
            items={[
              {
                id: 'NULL',
                name: 'Desselecionar',
                backgroundColor: undefined,
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...response.data.map((item: any) => {
                return { ...item };
              }),
            ]}
            onSelect={(location) => {
              const data = location.id === 'NULL' ? null : location;
              field.onChange(data);
              onSelect?.(data);
            }}
            onSearch={response.search}
            loading={response.isLoadingAll}
          />
        );
      }}
    </FormControlCustom>
  );
}
