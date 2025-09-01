import { FormControlCustom } from '@repo/ui/form/control';
import { InputSuggestions } from '@repo/ui/input';
import { CategoryComponent } from '../category-component';

interface Props {
  form: any;
  response: any;
  required?: boolean;
  label?: string;
  name?: string;
  onChange?(item: any | null): void;
  onChangeValue?(value: string | null): void;
  onSelectItem?(item: any | null): void;
}

export function WishlistFormComponent(props: Props) {
  const {
    label,
    name = 'description',
    form,
    response,
    required,
    onSelectItem,
    onChangeValue,
  } = props;

  return (
    <FormControlCustom required={required} label={label} name={name} control={form?.control}>
      {({ field }) => {
        const item = form.getValues('wishlist');
        return (
          <InputSuggestions
            placeholder="Insira descrição ou selecione"
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              onChangeValue?.(e.target?.value);
            }}
            item={item}
            items={response.data}
            renderItem={({ item }) => (
              <CategoryComponent
                title={(item as any).name}
                description={(item as any).category?.name}
                backgroundColor={(item as any)?.category?.color}
                icon={(item as any)?.category?.icon}
                showIcon={(item as any)?.showIcon}
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
      }}
    </FormControlCustom>
  );
}
